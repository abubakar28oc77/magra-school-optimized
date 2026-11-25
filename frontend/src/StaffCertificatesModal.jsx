import React, { useState, useMemo } from 'react';
import { MOCK_SCHOOL, getTeacherPhoto, getLeadershipData } from './mockData.js';
import schoolLogo from '../public/school-logo.png';
import { SCHOOL_PAD_HEADER_HTML, SCHOOL_PAD_STYLES } from './schoolPadHeader.js';

export const STAFF_CERT_CONFIG = {
  bonafide: { label: '📜 প্রত্যয়নপত্র', title: 'প্রত্যয়নপত্র (Bonafide Certificate)', color: '#047857', bg: '#ecfdf5', border: '#a7f3d0' },
  experience: { label: '🏆 অভিজ্ঞতার সনদ', title: 'অভিজ্ঞতার সনদ (Experience Certificate)', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  professional: { label: '🎖️ পেশাগত সনদ', title: 'পেশাগত সনদ (Professional Certificate)', color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  continuous: { label: '⏱️ নিরবিচ্ছিন্ন চাকুরী সনদ', title: 'নিরবিচ্ছিন্ন চাকুরী সনদ (Continuous Service)', color: '#7e22ce', bg: '#faf5ff', border: '#e9d5ff' },
  release_order: { label: '✈️ প্রশিক্ষণ ছাড়পত্র', title: 'প্রশিক্ষণ ছাড়পত্র ও অবমুক্তি আদেশ (Release Order)', color: '#c2410c', bg: '#fff7ed', border: '#fed7aa' },
  biodata: { label: '📄 আকর্ষণীয় বায়োডাটা (CV)', title: 'ব্যক্তিগত ও শিক্ষাগত বায়োডাটা (CV)', color: '#133e68', bg: '#f0f7ff', border: '#93c5fd' },
  id_card: { label: '🪪 শিক্ষক পরিচয়পত্র', title: 'অফিশিয়াল পরিচয়পত্র (ID Card)', color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe' }
};

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return '';
  return String(num).replace(/\d/g, (d) => BN_DIGITS[d]);
};

export function StaffCertificatesModal({
  isOpen,
  onClose,
  people = [],
  initialPersonId = '',
  initialTab = 'bonafide' // 'bonafide', 'experience', 'professional', 'continuous', 'release_order', 'biodata', 'id_card', 'office_copies'
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'bonafide');
  const [selectedPersonId, setSelectedPersonId] = useState(initialPersonId || (people[0]?.id || ''));
  const [searchQuery, setSearchQuery] = useState('');

  // Soft Office Copies Archive & Tracking State
  const [officeCopies, setOfficeCopies] = useState(() => {
    try {
      const raw = localStorage.getItem('magra_staff_certificate_office_copies');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load staff office copies', e);
      return [];
    }
  });
  const [officeNotes, setOfficeNotes] = useState('');
  const [saveToast, setSaveToast] = useState(null);
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveTypeFilter, setArchiveTypeFilter] = useState('all');
  const [archivePersonFilter, setArchivePersonFilter] = useState('all');
  const [previewCopyModal, setPreviewCopyModal] = useState(null);
  const [previewCopyFormat, setPreviewCopyFormat] = useState('office'); // 'office' | 'original'

  // Customizable certificate fields
  const [customMemoNo, setCustomMemoNo] = useState('');
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [conductAppraisal, setConductAppraisal] = useState('উত্তম, দায়িত্বশীল ও প্রশংসনীয়');

  // Specific fields for Training Release Order (প্রশিক্ষণ ছাড়পত্র)
  const [trainingSubject, setTrainingSubject] = useState('নতুন জাতীয় শিক্ষাক্রম বিস্তরণ ও বিষয়ভিত্তিক শ্রেণি মূল্যায়ন প্রশিক্ষণ');
  const [trainingInstitute, setTrainingInstitute] = useState('সরকারি টিচার্স ট্রেনিং কলেজ (TTC), ময়মনসিংহ');
  const [trainingLocation, setTrainingLocation] = useState('ময়মনসিংহ');
  const [trainingStartDate, setTrainingStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  });
  const [trainingEndDate, setTrainingEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });
  const [trainingDurationText, setTrainingDurationText] = useState('৬ দিনব্যাপী');

  // Continuous Service specific fields
  const [continuousServiceRemarks, setContinuousServiceRemarks] = useState('চাকুরীর ধারাবাহিকতায় কোনো প্রকার বিরতি (Break of Service) বা বিভাগীয় অসন্তোষজনক রেকর্ড নেই।');

  // Filter people list
  const filteredPeople = useMemo(() => {
    if (!searchQuery.trim()) return people;
    const q = searchQuery.toLowerCase();
    return people.filter(p =>
      (p.name_bn && p.name_bn.toLowerCase().includes(q)) ||
      (p.name_en && p.name_en.toLowerCase().includes(q)) ||
      (p.employee_id && String(p.employee_id).toLowerCase().includes(q)) ||
      (p.designation && p.designation.toLowerCase().includes(q)) ||
      (p.phone && p.phone.includes(q))
    );
  }, [people, searchQuery]);

  // Selected Person
  const person = useMemo(() => {
    return people.find(p => String(p.id) === String(selectedPersonId) || String(p.employee_id) === String(selectedPersonId)) || people[0] || null;
  }, [people, selectedPersonId]);

  if (!isOpen) return null;

  const school = MOCK_SCHOOL;

  // Format date helper
  const formatBnDate = (dStr) => {
    if (!dStr) return '—';
    const clean = String(dStr).slice(0, 10);
    const parts = clean.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return toBengaliDigits(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    return toBengaliDigits(clean);
  };

  // Calculate experience in years and months
  const calcExperienceText = (joinDateStr) => {
    if (!joinDateStr) return 'দীর্ঘদিন';
    try {
      const start = new Date(joinDateStr);
      const now = new Date();
      if (isNaN(start.getTime())) return 'দীর্ঘদিন';
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      if (years < 0) return 'কয়েক মাস';
      if (years === 0) return `${toBengaliDigits(months)} মাস`;
      if (months === 0) return `${toBengaliDigits(years)} বছর`;
      return `${toBengaliDigits(years)} বছর ${toBengaliDigits(months)} মাস`;
    } catch {
      return 'দীর্ঘদিন';
    }
  };

  const personNameBn = person?.name_bn || person?.name || '—';
  const personNameEn = person?.name_en || '';
  const designation = person?.designation || 'সহকারী শিক্ষক';
  const subject = person?.subject || '';
  const empId = person?.employee_id || person?.id || '—';
  const mpoIndex = person?.mpo_index_no || person?.mpo_code || person?.index_no || 'প্রযোজ্য নয়';
  const firstJoining = person?.first_joining_date || person?.current_post_joining_date || person?.joining_date || '২০১২-০১-০১';
  const currentJoining = person?.current_post_joining_date || person?.joining_date || person?.first_joining_date || '২০১২-০১-০১';
  const fatherName = person?.father_name_bn || person?.father_name || '—';
  const motherName = person?.mother_name_bn || person?.mother_name || '—';
  const gender = person?.gender === 'female' ? 'মহিলা' : 'পুরুষ';
  const honorific = person?.gender === 'female' ? 'জনাবা' : 'জনাব';
  const pronounHeShe = person?.gender === 'female' ? 'তিনি' : 'তিনি';
  const blood = person?.blood_group || 'O+';
  const phone = person?.phone || '—';
  const email = person?.email || '—';
  const address = person?.address || 'গ্রাম ও ডাকঘর: মগড়া, উপজেলা: কালিহাতি, জেলা: টাঙ্গাইল';
  const permanentAddress = person?.permanent_address || address;
  const nid = person?.nid_no || person?.extended_profile?.nid || '—';
  const photo = getTeacherPhoto(person);
  const experienceDuration = calcExperienceText(currentJoining);

  // Leadership & Signatory Resolution
  const leadership = typeof getLeadershipData === 'function' ? getLeadershipData() : null;
  const headTeacherName = leadership?.head?.name || school.headTeacher || 'মুহাম্মদ শফিকুল ইসলাম';
  const presidentName = leadership?.president?.name || school.president || 'নেয়ামুল হক খান';

  // Check if selected person is the Head Teacher (প্রধান শিক্ষক)
  const isHeadTeacher = Boolean(
    person?.public_contact_role === 'head_teacher' ||
    (person?.designation && person.designation.includes('প্রধান শিক্ষক') && !person.designation.includes('সহকারী') && !person.designation.includes('প্রাক্তন')) ||
    (person?.role === 'head_teacher') ||
    (personNameBn && (personNameBn.includes('শফিকুল ইসলাম') || personNameBn.trim() === headTeacherName.trim()))
  );

  // Signer data: President for Head Teacher; Head Teacher for other teachers & staff
  const signerName = isHeadTeacher ? presidentName : headTeacherName;
  const signerDesig = isHeadTeacher ? (leadership?.president?.role || 'সভাপতি') : 'প্রধান শিক্ষক';
  const signerSchool = school.nameBn;

  // Memo Number (default empty so it displays only "স্মারক নংঃ")
  const memoNo = (customMemoNo || '').trim();

  // Generate Document HTML based on active tab
  const generateDocumentHtml = () => {
    const formattedIssueDate = formatBnDate(issueDate);
    const formattedFirstJoin = formatBnDate(firstJoining);
    const formattedCurrentJoin = formatBnDate(currentJoining);
    const formattedTrainStart = formatBnDate(trainingStartDate);
    const formattedTrainEnd = formatBnDate(trainingEndDate);

    // 1. প্রত্যয়নপত্র (Employment / Bonafide Certificate)
    if (activeTab === 'bonafide') {
      return `
        <div class="cert-card-sheet bonafide-doc">
          <div class="cert-inner-border">
            ${SCHOOL_PAD_HEADER_HTML}

            <div class="doc-meta-row">
              <div class="meta-item"><b>স্মারক নংঃ</b> ${memoNo}</div>
              <div class="meta-item"><b>তারিখ:</b> ${formattedIssueDate} খ্রি.</div>
            </div>

            <div class="doc-title-banner">
              <h2>প্রত্যয়নপত্র</h2>
              <span class="sub-title-en">TO WHOM IT MAY CONCERN • BONAFIDE CERTIFICATE</span>
            </div>

            <div class="doc-body-text">
              <p class="doc-para">
                এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <b>${honorific} ${personNameBn}</b>${personNameEn ? ` (${personNameEn})` : ''}, পিতা: <b>${fatherName}</b>, মাতা: <b>${motherName}</b>, বর্তমান ঠিকানা: ${address}; তিনি ঐতিহ্যবাহী <b>${school.nameBn}</b>-এ <b>${designation}</b> ${subject ? `(${subject})` : ''} পদে <b>${formattedCurrentJoin}</b> খ্রি. তারিখ হইতে অদ্যাবধি সুনামের সহিত নিষ্ঠা ও দক্ষতার সাথে কর্মরত আছেন।
              </p>
              <p class="doc-para">
                বিদ্যালয়ের দাপ্তরিক ও এমপিও রেকর্ড অনুযায়ী তাঁহার বেতন কোড/এমপিও ইনডেক্স নম্বর: <b>${mpoIndex}</b> এবং শিক্ষক/কর্মচারী আইডি: <b>${empId}</b>। তিনি অত্র প্রতিষ্ঠানের একজন নিয়মিত ও দায়িত্বশীল স্থায়ী শিক্ষক/কর্মচারী।
              </p>
              <p class="doc-para">
                কর্মকালে তিনি শিক্ষকতা, প্রাতিষ্ঠানিক শৃঙ্খলা রক্ষা ও শিক্ষার্থীদের সার্বিক জ্ঞান বিকাশে অত্যন্ত নিবেদিতপ্রাণ। তাঁহার নৈতিক চরিত্র, আচার-ব্যবহার ও পেশাগত দায়িত্ববোধ <b>${conductAppraisal}</b>। আমার জানামতে তিনি প্রতিষ্ঠান বা রাষ্ট্রবিরোধী কোনো কার্যকলাপে কখনো লিপ্ত ছিলেন না।
              </p>
              <p class="doc-para closing-para">
                তাঁহার ব্যক্তিগত, প্রাতিষ্ঠানিক ও দাপ্তরিক সর্বপ্রকার প্রয়োজনে এই প্রত্যয়নপত্র প্রদান করা হইল। আমি তাঁহার কর্মজীবনের উত্তরোত্তর সাফল্য ও সার্বিক কল্যাণ কামনা করি।
              </p>
            </div>

            <div class="doc-sign-area">
              <div class="sign-block">
                <div class="sign-line"></div>
                <b>${signerName}</b>
                <span>${signerDesig}</span>
                <span>${signerSchool}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 2. অভিজ্ঞতার সনদ (Experience Certificate)
    if (activeTab === 'experience') {
      return `
        <div class="cert-card-sheet experience-doc">
          <div class="cert-inner-border">
            ${SCHOOL_PAD_HEADER_HTML}

            <div class="doc-meta-row">
              <div class="meta-item"><b>স্মারক নংঃ</b> ${memoNo}</div>
              <div class="meta-item"><b>তারিখ:</b> ${formattedIssueDate} খ্রি.</div>
            </div>

            <div class="doc-title-banner exp-banner">
              <h2>অভিজ্ঞতার সনদপত্র</h2>
              <span class="sub-title-en">CERTIFICATE OF TEACHING & PROFESSIONAL EXPERIENCE</span>
            </div>

            <div class="doc-body-text">
              <p class="doc-para">
                অত্যন্ত আনন্দের সহিত এই অভিজ্ঞতার সনদ প্রদান করা যাইতেছে যে, <b>${honorific} ${personNameBn}</b>${personNameEn ? ` (${personNameEn})` : ''}, পিতা: <b>${fatherName}</b>, মাতা: <b>${motherName}</b>; অত্র <b>${school.nameBn}</b>-এ <b>${designation}</b> ${subject ? `(${subject})` : ''} পদে <b>${formattedCurrentJoin}</b> খ্রি. তারিখে যোগদান করিয়া অদ্যাবধি প্রায় <b>${experienceDuration}</b> যাবৎ অত্যন্ত দক্ষতা, সততা ও একাগ্রতার সহিত শিক্ষকতা ও দাপ্তরিক দায়িত্ব পালন করিয়া আসিতেছেন।
              </p>
              <p class="doc-para">
                অত্র প্রতিষ্ঠানে দীর্ঘ কর্মকালীন সময়ে তিনি পাঠ্যক্রম পরিচালনা, বিষয়ভিত্তিক শ্রেণি পাঠদান, শিক্ষার্থীদের সৃজনশীল মেধা বিকাশ, আধুনিক ডিজিটাল শিক্ষা উপকরণ ব্যবহার এবং সহশিক্ষা কার্যক্রমে অনন্য অবদান রাখিয়াছেন। তাঁহার প্রাতিষ্ঠানিক আইডি নম্বর: <b>${empId}</b> এবং এমপিও ইনডেক্স নম্বর: <b>${mpoIndex}</b>।
              </p>
              <p class="doc-para">
                বিদ্যালয়ের শিক্ষক ও কর্মচারীদের সহিত তাঁহার পারস্পরিক সম্পর্ক অত্যন্ত সৌহার্দ্যপূর্ণ এবং তাঁহার নৈতিক আচরণ ও কর্মস্পৃহা <b>${conductAppraisal}</b>।
              </p>
              <p class="doc-para closing-para">
                তাঁহার উজ্জ্বল ভবিষ্যৎ, পেশাগত জীবনের উত্তরোত্তর সমৃদ্ধি ও সুস্বাস্থ্য কামনা করিয়া এই অভিজ্ঞতার সনদপত্র প্রদান করা হইল।
              </p>
            </div>

            <div class="doc-sign-area">
              <div class="sign-block">
                <div class="sign-line"></div>
                <b>${signerName}</b>
                <span>${signerDesig}</span>
                <span>${signerSchool}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 3. পেশাগত সনদ / চরিত্র ও আচরণ সনদ (Professional Certificate)
    if (activeTab === 'professional') {
      return `
        <div class="cert-card-sheet professional-doc">
          <div class="cert-inner-border">
            ${SCHOOL_PAD_HEADER_HTML}

            <div class="doc-meta-row">
              <div class="meta-item"><b>স্মারক নংঃ</b> ${memoNo}</div>
              <div class="meta-item"><b>তারিখ:</b> ${formattedIssueDate} খ্রি.</div>
            </div>

            <div class="doc-title-banner prof-banner">
              <h2>পেশাগত ও চারিত্রিক সনদপত্র</h2>
              <span class="sub-title-en">PROFESSIONAL EXCELLENCE & CONDUCT CERTIFICATE</span>
            </div>

            <div class="doc-body-text">
              <p class="doc-para">
                এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <b>${honorific} ${personNameBn}</b>, পিতা: <b>${fatherName}</b>, মাতা: <b>${motherName}</b>; অত্র <b>${school.nameBn}</b>-এর একজন নিয়মিত ও দায়িত্বশীল <b>${designation}</b> ${subject ? `(${subject})` : ''}। তিনি <b>${formattedCurrentJoin}</b> খ্রি. তারিখ হইতে অদ্যাবধি অত্র বিদ্যালয়ে সুনামের সহিত স্বীয় পেশাগত দায়িত্ব পালন করিতেছেন।
              </p>
              <p class="doc-para">
                কর্মকালে তিনি শিক্ষক সুলভ আদর্শ, নিয়মানুবর্তিতা, সততা ও উচ্চ নৈতিক মূল্যবোধের পরিচয় প্রদান করিয়াছেন। বিদ্যালয়ের যাবতীয় সহশিক্ষা কার্যক্রম, জাতীয় দিবস উদযাপন ও প্রাতিষ্ঠানিক শৃঙ্খলায় তাঁহার অবদান সর্বজনস্বীকৃত।
              </p>
              <p class="doc-para">
                তাঁহার ব্যক্তিগত চরিত্র নির্মল, উন্নত ও সমাজবান্ধব। তিনি কখনো কোনো শৃঙ্খলাবিরোধী বা নৈতিক অবক্ষয়মূলক কর্মকাণ্ডে জড়িত ছিলেন না। তাঁহার পেশাগত আচরণ অত্যন্ত প্রশংসনীয়।
              </p>
              <p class="doc-para closing-para">
                আমি তাঁহার সার্বিক পেশাগত উন্নতি ও দীর্ঘায়ু কামনা করি।
              </p>
            </div>

            <div class="doc-sign-area">
              <div class="sign-block">
                <div class="sign-line"></div>
                <b>${signerName}</b>
                <span>${signerDesig}</span>
                <span>${signerSchool}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 4. নিরবিচ্ছিন্ন চাকুরী সনদ (Continuous Service Certificate - MPO / Time-Scale / Promotion)
    if (activeTab === 'continuous') {
      return `
        <div class="cert-card-sheet continuous-doc">
          <div class="cert-inner-border">
            ${SCHOOL_PAD_HEADER_HTML}

            <div class="doc-meta-row">
              <div class="meta-item"><b>স্মারক নংঃ</b> ${memoNo}</div>
              <div class="meta-item"><b>তারিখ:</b> ${formattedIssueDate} খ্রি.</div>
            </div>

            <div class="doc-title-banner continuous-banner">
              <h2>নিরবিচ্ছিন্ন চাকুরী সনদপত্র</h2>
              <span class="sub-title-en">CONTINUOUS & UNBROKEN SERVICE CERTIFICATE</span>
            </div>

            <div class="doc-body-text">
              <p class="doc-para">
                এতদ্বারা এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <b>${honorific} ${personNameBn}</b>${personNameEn ? ` (${personNameEn})` : ''}, পিতা: <b>${fatherName}</b>, মাতা: <b>${motherName}</b>; অত্র <b>${school.nameBn}</b>-এ <b>${designation}</b> ${subject ? `(${subject})` : ''} পদে এমপিওভুক্ত শিক্ষক/কর্মচারী হিসেবে কর্মরত আছেন।
              </p>
              
              <div class="service-table-wrap">
                <table class="cert-info-grid">
                  <tr>
                    <td class="col-lbl">শিক্ষক/কর্মচারীর আইডি:</td>
                    <td class="col-val"><b>${empId}</b></td>
                    <td class="col-lbl">এমপিও ইনডেক্স নম্বর:</td>
                    <td class="col-val"><b>${mpoIndex}</b></td>
                  </tr>
                  <tr>
                    <td class="col-lbl">প্রথম নিয়োগ ও যোগদানের তারিখ:</td>
                    <td class="col-val"><b>${formattedFirstJoin}</b> খ্রি.</td>
                    <td class="col-lbl">বর্তমান পদে যোগদানের তারিখ:</td>
                    <td class="col-val"><b>${formattedCurrentJoin}</b> খ্রি.</td>
                  </tr>
                  <tr>
                    <td class="col-lbl">জাতীয় পরিচয়পত্র (NID):</td>
                    <td class="col-val">${nid}</td>
                    <td class="col-lbl">বর্তমান চাকুরীর অবস্থা:</td>
                    <td class="col-val"><span class="badge-active">সক্রিয় ও এমপিওভুক্ত</span></td>
                  </tr>
                </table>
              </div>

              <p class="doc-para" style="margin-top:14px">
                সার্ভিস বুক ও অত্র বিদ্যালয়ের দাপ্তরিক রেজিস্টার পুঙ্খানুপুঙ্খ যাচাই করিয়া দেখা গেল যে, তিনি তাঁহার প্রথম যোগদানের তারিখ <b>${formattedFirstJoin}</b> খ্রি. হইতে অদ্যাবধি <b>${formattedIssueDate}</b> খ্রি. পর্যন্ত অত্র বিদ্যালয়ে সম্পূর্ণ <b>ধারাবাহিক ও নিরবিচ্ছিন্নভাবে (Continuous & Unbroken Service)</b> চাকুরীতে বহাল রহিয়াছেন।
              </p>
              <p class="doc-para">
                <b>${continuousServiceRemarks}</b> তিনি কখনো বিনা অনুমতিতে অনুপস্থিত ছিলেন না এবং তাঁহার চাকুরীর মোট স্থিতিকাল সর্বতোভাবে সন্তোষজনক।
              </p>
              <p class="doc-para closing-para">
                উচ্চতর স্কেল / টাইম-স্কেল / পদোন্নতি / সরকারি সুযোগ-সুবিধা ও সার্ভিস বুক হালনাগাদের নিমিত্তে এই সনদপত্র প্রদান করা হইল।
              </p>
            </div>

            <div class="doc-sign-area">
              <div class="sign-block">
                <div class="sign-line"></div>
                <b>${signerName}</b>
                <span>${signerDesig}</span>
                <span>${signerSchool}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 5. প্রশিক্ষণ ছাড়পত্র / অবমুক্তি আদেশ (Training Release Order / Clearance)
    if (activeTab === 'release_order') {
      return `
        <div class="cert-card-sheet release-doc">
          <div class="cert-inner-border">
            ${SCHOOL_PAD_HEADER_HTML}

            <div class="doc-meta-row">
              <div class="meta-item"><b>স্মারক নংঃ</b> ${memoNo}</div>
              <div class="meta-item"><b>তারিখ:</b> ${formattedIssueDate} খ্রি.</div>
            </div>

            <div class="doc-title-banner release-banner">
              <h2>প্রশিক্ষণ ছাড়পত্র ও অবমুক্তি আদেশ (Release Order)</h2>
              <span class="sub-title-en">OFFICIAL RELEASE ORDER & CLEARANCE FOR PROFESSIONAL TRAINING</span>
            </div>

            <div class="doc-body-text">
              <p class="doc-para">
                যথাযথ কর্তৃপক্ষের নির্দেশনা ও প্রাতিষ্ঠানিক সিদ্ধান্তের প্রেক্ষিতে অত্র বিদ্যালয়ের <b>${designation}</b> ${subject ? `(${subject})` : ''} <b>${honorific} ${personNameBn}</b>${personNameEn ? ` (${personNameEn})` : ''}, আইডি নম্বর: <b>${empId}</b>, ইনডেক্স নং: <b>${mpoIndex}</b>-কে নিম্নলিখিত প্রশিক্ষণ কোর্সে অংশগ্রহণের নিমিত্তে অত্র বিদ্যালয়ের দায়িত্বভার হইতে সাময়িকভাবে অবমুক্তি (Release Order / ছাড়পত্র) প্রদান করা হইল:
              </p>

              <div class="training-highlight-box">
                <table class="training-details-table">
                  <tr>
                    <td class="t-lbl">১. প্রশিক্ষণের বিষয় ও শিরোনাম:</td>
                    <td class="t-val"><b class="t-title">${trainingSubject}</b></td>
                  </tr>
                  <tr>
                    <td class="t-lbl">২. প্রশিক্ষণ প্রদানকারী প্রতিষ্ঠান:</td>
                    <td class="t-val"><b>${trainingInstitute}</b></td>
                  </tr>
                  <tr>
                    <td class="t-lbl">৩. প্রশিক্ষণ ভেন্যু / অবস্থান:</td>
                    <td class="t-val">${trainingLocation}</td>
                  </tr>
                  <tr>
                    <td class="t-lbl">৪. প্রশিক্ষণের সময়সীমা:</td>
                    <td class="t-val">
                      <b>${formattedTrainStart}</b> খ্রি. হইতে <b>${formattedTrainEnd}</b> খ্রি. পর্যন্ত (${trainingDurationText})
                    </td>
                  </tr>
                  <tr>
                    <td class="t-lbl">৫. অবমুক্তির কার্যকাল:</td>
                    <td class="t-val"><b>${formattedTrainStart}</b> খ্রি. অপরাহ্ন / পূর্বাহ্ন হইতে কার্যকর হইবে।</td>
                  </tr>
                </table>
              </div>

              <div class="conditions-box">
                <b>শর্তাবলি:</b>
                <ol>
                  <li>প্রশিক্ষণকালীন সময়ে তিনি যথারীতি সরকারি বিধি মোতাবেক প্রশিক্ষণ ভাতা / টিএ-ডিএ সুবিধা প্রাপ্য হইবেন।</li>
                  <li>প্রশিক্ষণ সমাপ্তির পর অনতিবিলম্বে প্রশিক্ষণ সমাপ্তি সনদপত্রের কপিসহ অত্র বিদ্যালয়ে পূর্ববর্তী পদে যোগদানপত্র দাখিল করিবেন।</li>
                  <li>প্রশিক্ষণলব্ধ জ্ঞান বিদ্যালয়ের শ্রেণি কার্যক্রম ও সহকর্মীদের সাথে শেয়ার করিতে বাধ্য থাকিবেন।</li>
                </ol>
              </div>

              <p class="doc-para closing-para" style="margin-top:10px">
                তাঁহার প্রশিক্ষণ সাফল্যমণ্ডিত ও ফলপ্রসূ হউক—এই কামনা করি।
              </p>
            </div>

            <div class="doc-sign-area">
              <div class="sign-block">
                <div class="sign-line"></div>
                <b>${signerName}</b>
                <span>${signerDesig}</span>
                <span>${signerSchool}</span>
              </div>
            </div>


          </div>
        </div>
      `;
    }

    // 6. আকর্ষণীয় জীবনবৃত্তান্ত / বায়োডাটা (Executive Bio-Data / CV) - Exact Match with Image 2 Design
    if (activeTab === 'biodata') {
      const ext = person?.extended_profile || {};
      const isEmp6 = person?.employee_id === 'EMP-006' || String(person?.id) === 't-6';

      // Date formatting to Bengali DD/MM/YYYY
      const toSlashBnDate = (dStr) => {
        if (!dStr) return '—';
        const clean = String(dStr).trim();
        const parts = clean.split(/[-/]/);
        if (parts.length === 3) {
          if (parts[0].length === 4) {
            return toBengaliDigits(`${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`);
          } else if (parts[2].length === 4) {
            return toBengaliDigits(`${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`);
          }
        }
        return toBengaliDigits(clean);
      };

      // Experience calculation
      const calcExperienceDetailed = (joinDateStr) => {
        if (!joinDateStr) return '২১ বছর ১০ মাস (প্রায়)';
        try {
          const start = new Date(joinDateStr);
          const now = new Date();
          if (isNaN(start.getTime())) return '২১ বছর ১০ মাস (প্রায়)';
          let years = now.getFullYear() - start.getFullYear();
          let months = now.getMonth() - start.getMonth();
          if (months < 0) {
            years -= 1;
            months += 12;
          }
          if (years < 0) return 'কয়েক মাস';
          if (years === 0) return `${toBengaliDigits(months)} মাস (প্রায়)`;
          if (months === 0) return `${toBengaliDigits(years)} বছর (প্রায়)`;
          return `${toBengaliDigits(years)} বছর ${toBengaliDigits(months)} মাস (প্রায়)`;
        } catch {
          return '২১ বছর ১০ মাস (প্রায়)';
        }
      };

      // Format blood group with parenthesis
      const formatBloodGroup = (bg) => {
        if (!bg) return 'A(+)';
        const clean = String(bg).trim().toUpperCase();
        if (clean.endsWith('+')) return `${clean.slice(0, -1)}(+)`;
        if (clean.endsWith('-')) return `${clean.slice(0, -1)}(-)`;
        return clean;
      };

      // 1. Personal Names & Titles
      const personNameBnExact = isEmp6 ? 'মুহাম্মদ আবুবকর সিদ্দিক' : personNameBn;
      const personNameEnExact = isEmp6 ? 'MUHAMMAD ABUBAKAR SIDDIQUE' : (personNameEn || person?.name_en || '').toUpperCase();
      const designationExact = isEmp6 ? 'সিনিয়র শিক্ষক (আইসিটি)' : (subject && !designation.includes(subject) ? `${designation} (${subject})` : designation);
      const schoolFullName = 'মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়, মগড়া, কালিহাতী, টাঙ্গাইল';

      // 2. Personal Information
      const father = isEmp6 ? 'আব্দুস ছামাদ' : fatherName;
      const mother = isEmp6 ? 'নাজমা সুলতানা' : motherName;
      const dobSlash = isEmp6 ? '২৮/১০/১৯৭৭' : (person?.date_of_birth ? toSlashBnDate(person.date_of_birth) : '২৮/১০/১৯৭৭');
      const birthPlace = isEmp6 ? 'টাঙ্গাইল' : (person?.birth_place || person?.district || 'টাঙ্গাইল');
      const rel = person?.religion || 'ইসলাম';
      const marital = person?.marital_status || 'বিবাহিত';
      const bloodExact = isEmp6 ? 'A(+)' : formatBloodGroup(person?.blood_group || blood || 'A+');
      const heightExact = isEmp6 ? '৫ ফুট ৫ ইঞ্চি' : (person?.height || '৫ ফুট ৫ ইঞ্চি');

      // 3. Employment Information
      const mpoIdxExact = isEmp6 ? 'D1031044' : mpoIndex;
      const firstJoinSlash = isEmp6 ? '০১/০১/২০০৫' : toSlashBnDate(firstJoining || '2005-01-01');
      const firstMpoSlash = isEmp6 ? '০১/০২/২০০৬' : toSlashBnDate(person?.first_mpo_date || '2006-02-01');
      const currentJoinSlash = isEmp6 ? '০১/০১/২০০৫' : toSlashBnDate(currentJoining || firstJoining || '2005-01-01');
      const totalExpExact = isEmp6 ? '২১ বছর ১০ মাস (প্রায়)' : calcExperienceDetailed(firstJoining || '2005-01-01');

      // 4. Contact Information
      const mobileExact = isEmp6 ? '01710689846' : phone;
      const whatsappExact = isEmp6 ? '01710689846' : (person?.whatsapp || phone);
      const emailExact = isEmp6 ? 'abubakar.28oc77@gmail.com' : email;
      const nidExact = isEmp6 ? '1010349254' : (person?.nid_no || nid || '1010349254');
      const presentAddr = isEmp6 ? 'গ্রাম- টুনিমরুড়া, ডাকঘর- মগড়া, উপজেলা- কালিহাতী, জেলা- টাঙ্গাইল।' : address;
      const permAddr = isEmp6 ? 'গ্রাম- টুনিমরুড়া, ডাকঘর- মগড়া, উপজেলা- কালিহাতী, জেলা- টাঙ্গাইল।' : permanentAddress;

      // 5. Educational Qualifications Rows
      let eduRowsHtml = '';
      if (isEmp6) {
        eduRowsHtml = `
          <tr>
            <td class="cv-td">এস.এস.সি</td>
            <td class="cv-td">মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়</td>
            <td class="cv-td">ঢাকা</td>
            <td class="cv-td">বিজ্ঞান / প্রথম বিভাগ</td>
            <td class="cv-td" style="text-align:center">১৯৯২</td>
          </tr>
          <tr>
            <td class="cv-td">এইচ.এস.সি</td>
            <td class="cv-td">হাজী ওয়াছেদ মরিয়ম ডিগ্রী কলেজ সিরাজগঞ্জ</td>
            <td class="cv-td">ঢাকা</td>
            <td class="cv-td">বিজ্ঞান / দ্বিতীয় বিভাগ</td>
            <td class="cv-td" style="text-align:center">১৯৯৪</td>
          </tr>
          <tr>
            <td class="cv-td">বি.এস-সি</td>
            <td class="cv-td">কালিহাতি কলেজ, কালিহাতি</td>
            <td class="cv-td">জাতীয় বিশ্ববিদ্যালয়</td>
            <td class="cv-td">বিজ্ঞান / দ্বিতীয় বিভাগ</td>
            <td class="cv-td" style="text-align:center">১৯৯৬</td>
          </tr>
        `;
      } else {
        const extEdu = ext.education;
        if (Array.isArray(extEdu) && extEdu.length) {
          eduRowsHtml = extEdu.map(e => {
            let examName = e.exam || '—';
            if (examName.includes('এসএসসি') || examName.includes('SSC')) examName = 'এস.এস.সি';
            else if (examName.includes('এইচএসসি') || examName.includes('HSC')) examName = 'এইচ.এস.সি';
            else if (examName.includes('স্নাতক (পাস)') || examName.includes('বিএসসি') || examName.includes('বি.এস.সি')) examName = 'বি.এস-সি';
            else if (examName.includes('স্নাতক (সম্মান)') || examName.includes('অনার্স')) examName = 'স্নাতক (সম্মান)';
            else if (examName.includes('স্নাতকোত্তর') || examName.includes('মাস্টার্স')) examName = 'স্নাতকোত্তর';

            let division = e.result || '—';
            if (e.subject && !division.includes(e.subject)) {
              division = `${e.subject} / ${division}`;
            }
            return `
              <tr>
                <td class="cv-td">${examName}</td>
                <td class="cv-td">${e.institution || '—'}</td>
                <td class="cv-td">${e.board || '—'}</td>
                <td class="cv-td">${division}</td>
                <td class="cv-td" style="text-align:center">${toBengaliDigits(e.year || '—')}</td>
              </tr>
            `;
          }).join('');
        } else if (person?.educational_qualifications && typeof person.educational_qualifications === 'string') {
          const parts = person.educational_qualifications.split(';').map(p => p.trim()).filter(Boolean);
          eduRowsHtml = parts.map(p => {
            const segs = p.split('-').map(s => s.trim());
            let exam = segs[0] || '—';
            if (exam.includes('এসএসসি') || exam.includes('SSC')) exam = 'এস.এস.সি';
            else if (exam.includes('এইচএসসি') || exam.includes('HSC')) exam = 'এইচ.এস.সি';
            else if (exam.includes('স্নাতক (পাস)') || exam.includes('বিএসসি')) exam = 'বি.এস-সি';
            const inst = segs[1] || '—';
            const board = segs[2] || '—';
            const sub = segs[3] || '';
            const yr = segs[4] || '—';
            const res = segs[5] || segs[4] || '—';
            const division = sub ? `${sub} / ${res}` : res;
            return `
              <tr>
                <td class="cv-td">${exam}</td>
                <td class="cv-td">${inst}</td>
                <td class="cv-td">${board}</td>
                <td class="cv-td">${division}</td>
                <td class="cv-td" style="text-align:center">${toBengaliDigits(yr)}</td>
              </tr>
            `;
          }).join('');
        } else {
          eduRowsHtml = `
            <tr>
              <td class="cv-td">এস.এস.সি</td>
              <td class="cv-td">মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়</td>
              <td class="cv-td">ঢাকা</td>
              <td class="cv-td">বিজ্ঞান / প্রথম বিভাগ</td>
              <td class="cv-td" style="text-align:center">১৯৯২</td>
            </tr>
            <tr>
              <td class="cv-td">এইচ.এস.সি</td>
              <td class="cv-td">হাজী ওয়াছেদ মরিয়ম ডিগ্রী কলেজ সিরাজগঞ্জ</td>
              <td class="cv-td">ঢাকা</td>
              <td class="cv-td">বিজ্ঞান / দ্বিতীয় বিভাগ</td>
              <td class="cv-td" style="text-align:center">১৯৯৪</td>
            </tr>
            <tr>
              <td class="cv-td">বি.এস-সি</td>
              <td class="cv-td">কালিহাতি কলেজ, কালিহাতি</td>
              <td class="cv-td">জাতীয় বিশ্ববিদ্যালয়</td>
              <td class="cv-td">বিজ্ঞান / দ্বিতীয় বিভাগ</td>
              <td class="cv-td" style="text-align:center">১৯৯৬</td>
            </tr>
          `;
        }
      }

      // 6. Professional Qualifications Rows
      let profRowsHtml = '';
      if (isEmp6) {
        profRowsHtml = `
          <tr>
            <td class="cv-td">ডিপ্লোমা-ইন কম্পিউটার সাইন্স</td>
            <td class="cv-td">ন্যাশনাল ইউথ ডেভেলপমেন্ট কম্পিউটার ট্রেনিং একাডেমি</td>
            <td class="cv-td" style="text-align:center">২০০৪</td>
            <td class="cv-td" style="text-align:center">জিপি- A</td>
          </tr>
          <tr>
            <td class="cv-td">বি.এড</td>
            <td class="cv-td">এশিয়ান ইউনিভার্সিটি</td>
            <td class="cv-td" style="text-align:center">২০০৮</td>
            <td class="cv-td" style="text-align:center">CGPA: 3.94</td>
          </tr>
        `;
      } else {
        const extProf = ext.professional_qualifications;
        if (Array.isArray(extProf) && extProf.length) {
          profRowsHtml = extProf.map(p => {
            let examName = p.exam || '—';
            if (examName === 'ডিপ্লোমা' || examName.includes('ডিপ্লোমা')) examName = 'ডিপ্লোমা-ইন কম্পিউটার সাইন্স';
            else if (examName === 'বিএড') examName = 'বি.এড';
            let res = p.result || '—';
            if (res === '৩.৯৪' || res === '3.94') res = 'CGPA: 3.94';
            return `
              <tr>
                <td class="cv-td">${examName}</td>
                <td class="cv-td">${p.institution || '—'}</td>
                <td class="cv-td" style="text-align:center">${toBengaliDigits(p.year || '—')}</td>
                <td class="cv-td" style="text-align:center">${res}</td>
              </tr>
            `;
          }).join('');
        } else if (person?.professional_degrees && typeof person.professional_degrees === 'string') {
          const parts = person.professional_degrees.split(';').map(p => p.trim()).filter(Boolean);
          profRowsHtml = parts.map(p => {
            const segs = p.split('-').map(s => s.trim());
            let exam = segs[0] || '—';
            if (exam.includes('ডিপ্লোমা')) exam = 'ডিপ্লোমা-ইন কম্পিউটার সাইন্স';
            else if (exam.includes('বিএড')) exam = 'বি.এড';
            return `
              <tr>
                <td class="cv-td">${exam}</td>
                <td class="cv-td">${segs[1] || '—'}</td>
                <td class="cv-td" style="text-align:center">${toBengaliDigits(segs[3] || segs[2] || '—')}</td>
                <td class="cv-td" style="text-align:center">${segs[4] || segs[3] || '—'}</td>
              </tr>
            `;
          }).join('');
        } else {
          profRowsHtml = `
            <tr>
              <td class="cv-td">ডিপ্লোমা-ইন কম্পিউটার সাইন্স</td>
              <td class="cv-td">ন্যাশনাল ইউথ ডেভেলপমেন্ট কম্পিউটার ট্রেনিং একাডেমি</td>
              <td class="cv-td" style="text-align:center">২০০৪</td>
              <td class="cv-td" style="text-align:center">জিপি- A</td>
            </tr>
            <tr>
              <td class="cv-td">বি.এড</td>
              <td class="cv-td">এশিয়ান ইউনিভার্সিটি</td>
              <td class="cv-td" style="text-align:center">২০০৮</td>
              <td class="cv-td" style="text-align:center">CGPA: 3.94</td>
            </tr>
          `;
        }
      }

      // 7. Skills & Competency
      const sub = (subject || '').trim();
      let trainerTitle = 'আইসিটি বিষয়ের মাস্টার ট্রেইনার';
      if (isEmp6) trainerTitle = 'আইসিটি বিষয়ের মাস্টার ট্রেইনার';
      else if (sub.includes('গণিত')) trainerTitle = 'গণিত বিষয়ের মাস্টার ট্রেইনার';
      else if (sub.includes('বিজ্ঞান') || sub.includes('পদার্থ') || sub.includes('রসায়ন')) trainerTitle = 'বিজ্ঞান বিষয়ের মাস্টার ট্রেইনার';
      else if (sub.includes('ইংরেজি')) trainerTitle = 'ইংরেজি বিষয়ের মাস্টার ট্রেইনার';
      else if (sub.includes('বাংলা')) trainerTitle = 'বাংলা বিষয়ের মাস্টার ট্রেইনার';
      else if (isHeadTeacher) trainerTitle = 'প্রাতিষ্ঠানিক নেতৃত্ব ও মাস্টার ট্রেইনার';

      // 8. Achievements
      const achievementRole = 'অ্যাম্বাসেডর';
      const achievementTitle = isEmp6 
        ? 'ICT4E জেলা শিক্ষক অ্যাম্বাসেডর শিক্ষক' 
        : (ext.achievement_title || (isHeadTeacher ? 'শ্রেষ্ঠ প্রতিষ্ঠান প্রধান ও শিক্ষা উন্নয়ন অ্যাওয়ার্ড' : 'ICT4E জেলা শিক্ষক অ্যাম্বাসেডর শিক্ষক'));

      // 9. Golden Medal / Ribbon Emblem Badge SVG
      const goldenBadgeSvg = `
        <svg width="42" height="46" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
          <path d="M38 65 L26 102 L48 90 L52 102 L48 65 Z" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
          <path d="M62 65 L74 102 L52 90 L48 102 L52 65 Z" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
          <path d="M30 102 L40 70 L50 90 Z" fill="#78350f" opacity="0.4"/>
          <circle cx="50" cy="45" r="38" fill="url(#goldGrad)" stroke="#78350f" stroke-width="2"/>
          <circle cx="50" cy="45" r="33" fill="none" stroke="#92400e" stroke-width="1.5" stroke-dasharray="3 2"/>
          <circle cx="50" cy="45" r="30" fill="url(#goldInner)" stroke="#b45309" stroke-width="1"/>
          <polygon points="50,23 54,35 67,35 56,43 60,56 50,47 40,56 44,43 33,35 46,35" fill="#fef08a" stroke="#854d0e" stroke-width="1"/>
          <circle cx="50" cy="45" r="8" fill="#d97706" stroke="#78350f" stroke-width="1"/>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="35%" stop-color="#f59e0b"/>
              <stop offset="70%" stop-color="#d97706"/>
              <stop offset="100%" stop-color="#78350f"/>
            </linearGradient>
            <linearGradient id="goldInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fffbeb"/>
              <stop offset="50%" stop-color="#fde68a"/>
              <stop offset="100%" stop-color="#f59e0b"/>
            </linearGradient>
          </defs>
        </svg>
      `;

      return `
        <div class="cert-card-sheet biodata-official-sheet">
          <!-- Top Centered Header Box -->
          <div class="cv-title-wrap">
            <div class="cv-title-box">ব্যক্তিগত ও শিক্ষাগত বায়োডাটা</div>
          </div>

          <!-- Profile Header Box -->
          <div class="cv-profile-box">
            <div class="cv-profile-info">
              <h1 class="cv-name-bn">${personNameBnExact}</h1>
              <h3 class="cv-name-en">${personNameEnExact}</h3>
              <div class="cv-desig-school">${designationExact}, ${schoolFullName}</div>
            </div>
            <div class="cv-photo-frame">
              <img src="${photo}" alt="${personNameBnExact}" onerror="this.src='/school-building.jpg'">
            </div>
          </div>

          <!-- ১. ব্যক্তিগত পরিচিতিঃ -->
          <div class="cv-sec-title">ব্যক্তিগত পরিচিতিঃ</div>
          <table class="cv-table">
            <thead>
              <tr>
                <th style="width: 18%; text-align: left;">বিষয়</th>
                <th style="width: 32%; text-align: left;">বিবরণ</th>
                <th style="width: 18%; text-align: left;">বিষয়</th>
                <th style="width: 32%; text-align: left;">বিবরণ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="cv-lbl">পিতার নাম</td>
                <td class="cv-val">${father}</td>
                <td class="cv-lbl">মাতার নাম</td>
                <td class="cv-val">${mother}</td>
              </tr>
              <tr>
                <td class="cv-lbl">জন্মতারিখ</td>
                <td class="cv-val">${dobSlash}</td>
                <td class="cv-lbl">জন্মস্থান</td>
                <td class="cv-val">${birthPlace}</td>
              </tr>
              <tr>
                <td class="cv-lbl">ধর্ম</td>
                <td class="cv-val">${rel}</td>
                <td class="cv-lbl">বৈবাহিক অবস্থা</td>
                <td class="cv-val">${marital}</td>
              </tr>
              <tr>
                <td class="cv-lbl">রক্তের গ্রুপ</td>
                <td class="cv-val"><span class="cv-val-blood">${bloodExact}</span></td>
                <td class="cv-lbl">উচ্চতা</td>
                <td class="cv-val">${heightExact}</td>
              </tr>
            </tbody>
          </table>

          <!-- ২. পেশাগত পরিচিতিঃ -->
          <div class="cv-sec-title">পেশাগত পরিচিতিঃ</div>
          <table class="cv-table">
            <tbody>
              <tr>
                <td class="cv-lbl" style="width: 18%;">পদবি</td>
                <td class="cv-val" style="width: 32%; font-weight: 600;">${designationExact}</td>
                <td class="cv-lbl" style="width: 22%;">এমপিও ইনডেক্স</td>
                <td class="cv-val" style="width: 28%; font-weight: 700;">${mpoIdxExact}</td>
              </tr>
              <tr>
                <td class="cv-lbl">প্রতিষ্ঠানের নাম</td>
                <td class="cv-val" colspan="3">${schoolFullName}</td>
              </tr>
              <tr>
                <td class="cv-lbl">১ম যোগদানের তারিখ</td>
                <td class="cv-val">${firstJoinSlash}</td>
                <td class="cv-lbl">১ম এমপিও ভুক্তির তারিখ</td>
                <td class="cv-val">${firstMpoSlash}</td>
              </tr>
              <tr>
                <td class="cv-lbl">বর্তমান পদে যোগদান</td>
                <td class="cv-val">${currentJoinSlash}</td>
                <td class="cv-lbl">চাকুরিতে মোট অভিজ্ঞতা</td>
                <td class="cv-val" style="font-weight: 700;">${totalExpExact}</td>
              </tr>
            </tbody>
          </table>

          <!-- ৩. যোগাযোগের তথ্যঃ -->
          <div class="cv-sec-title">যোগাযোগের তথ্যঃ</div>
          <table class="cv-table">
            <tbody>
              <tr>
                <td class="cv-lbl" style="width: 18%;">মোবাইল নাম্বার</td>
                <td class="cv-val" style="width: 32%; font-weight: 600;">${mobileExact}</td>
                <td class="cv-lbl" style="width: 22%;">হোয়াটসঅ্যাপ নাম্বার</td>
                <td class="cv-val" style="width: 28%; font-weight: 600;">${whatsappExact}</td>
              </tr>
              <tr>
                <td class="cv-lbl">ই-মেইল</td>
                <td class="cv-val" colspan="3"><span class="cv-val-email">${emailExact}</span></td>
              </tr>
              <tr>
                <td class="cv-lbl">জাতীয় পরিচয়পত্র নাম্বার</td>
                <td class="cv-val" colspan="3" style="font-weight: 700;">${nidExact}</td>
              </tr>
              <tr>
                <td class="cv-lbl">বর্তমান ঠিকানা</td>
                <td class="cv-val" colspan="3">${presentAddr}</td>
              </tr>
              <tr>
                <td class="cv-lbl">স্থায়ী ঠিকানা</td>
                <td class="cv-val" colspan="3">${permAddr}</td>
              </tr>
            </tbody>
          </table>

          <!-- ৪. শিক্ষাগত যোগ্যতাঃ -->
          <div class="cv-sec-title">শিক্ষাগত যোগ্যতাঃ</div>
          <table class="cv-table">
            <thead>
              <tr>
                <th style="width: 16%; text-align: left;">পরীক্ষা/ডিগ্রি</th>
                <th style="width: 36%; text-align: left;">প্রতিষ্ঠান</th>
                <th style="width: 20%; text-align: left;">বোর্ড/বিশ্ববিদ্যালয়</th>
                <th style="width: 18%; text-align: left;">বিভাগ/ফলাফল</th>
                <th style="width: 10%; text-align: center;">সাল</th>
              </tr>
            </thead>
            <tbody>
              ${eduRowsHtml}
            </tbody>
          </table>

          <!-- ৫. পেশাগত যোগ্যতাঃ -->
          <div class="cv-sec-title">পেশাগত যোগ্যতাঃ</div>
          <table class="cv-table">
            <thead>
              <tr>
                <th style="width: 28%; text-align: left;">প্রশিক্ষণের নাম</th>
                <th style="width: 44%; text-align: left;">প্রতিষ্ঠান</th>
                <th style="width: 12%; text-align: center;">সাল</th>
                <th style="width: 16%; text-align: center;">ফলাফল</th>
              </tr>
            </thead>
            <tbody>
              ${profRowsHtml}
            </tbody>
          </table>

          <!-- ৬. দক্ষতা ও পেশাগত সক্ষমতাঃ -->
          <div class="cv-sec-title">দক্ষতা ও পেশাগত সক্ষমতাঃ</div>
          <table class="cv-table">
            <tbody>
              <tr>
                <td class="cv-lbl" style="width: 30%; font-weight: 700; vertical-align: middle;">
                  ${trainerTitle}
                </td>
                <td style="width: 70%; padding: 0;">
                  <div class="cv-sub-item">জাতীয় শিক্ষাক্রম বিস্তরণ-২০২১</div>
                  <div class="cv-sub-item">নেটওয়ার্কিং এন্ড প্রোগ্রামিং</div>
                  <div class="cv-sub-item">ইনহাউজ ট্রেনিং (IHT) : নেটওয়ার্কিং এন্ড প্রোগ্রামিং</div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- ৭. অর্জনঃ -->
          <div class="cv-sec-title">অর্জনঃ</div>
          <table class="cv-table">
            <tbody>
              <tr>
                <td class="cv-lbl" style="width: 30%; font-weight: 700; vertical-align: middle;">
                  ${achievementRole}
                </td>
                <td class="cv-val" style="width: 55%; font-weight: 700; color: #133e68; vertical-align: middle;">
                  ${achievementTitle}
                </td>
                <td style="width: 15%; text-align: center; vertical-align: middle; padding: 4px 6px;">
                  ${goldenBadgeSvg}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Signature -->
          <div class="cv-signature-area">
            স্বাক্ষরঃ.........................
          </div>
        </div>
      `;
    }

    // 7. শিক্ষক ও কর্মচারী ডিজিটাল পরিচয়পত্র (Staff ID Card - Front & Back)
    if (activeTab === 'id_card') {
      return `
        <div class="staff-id-card-wrap">
          <!-- FRONT CARD -->
          <div class="staff-id-card front-card">
            <div class="staff-card-header">
              <img src="${schoolLogo}" class="staff-logo" alt="Logo">
              <div class="staff-school-meta">
                <h3 class="staff-school-bn">${school.nameBn}</h3>
                <h5 class="staff-school-en">${school.nameEn}</h5>
                <p class="staff-school-sub">EIIN: ${school.eiin} • স্থাপিত: ১৯৪৬ • কালিহাতি, টাঙ্গাইল</p>
              </div>
            </div>

            <div class="staff-card-ribbon">
              <span>TEACHER & STAFF IDENTITY CARD • শিক্ষক ও কর্মচারী পরিচয়পত্র</span>
            </div>

            <div class="staff-card-body">
              <div class="staff-photo-frame">
                <img src="${photo}" alt="${personNameBn}">
              </div>

              <div class="staff-title-wrap">
                <div class="staff-name-bn">${personNameBn}</div>
                ${personNameEn ? `<div class="staff-name-en">${personNameEn}</div>` : ''}
                <div class="staff-desig-tag">${designation} ${subject ? `(${subject})` : ''}</div>
              </div>

              <table class="staff-table">
                <tr>
                  <td class="lbl">এমপ্লয়ী আইডি</td>
                  <td class="sep">:</td>
                  <td class="val"><b>${empId}</b></td>
                </tr>
                <tr>
                  <td class="lbl">ইনডেক্স নম্বর</td>
                  <td class="sep">:</td>
                  <td class="val"><b class="index-num">${mpoIndex}</b></td>
                </tr>
                <tr>
                  <td class="lbl">মোবাইল নম্বর</td>
                  <td class="sep">:</td>
                  <td class="val"><b class="mono-phone">${phone}</b></td>
                </tr>
                <tr>
                  <td class="lbl">রক্তের গ্রুপ</td>
                  <td class="sep">:</td>
                  <td class="val"><span class="blood-pill">🩸 ${blood}</span></td>
                </tr>
              </table>
            </div>

            <div class="staff-card-footer">
              <div class="barcode-area">
                <div class="barcode-bars">|||| ||| |||| | ||| ||||</div>
                <span>${empId ? `EMP-${empId}` : 'MAGRA-STAFF'}</span>
              </div>
              <div class="sign-area">
                <div class="sign-line"></div>
                <span>${signerDesig}</span>
              </div>
            </div>
          </div>

          <!-- BACK CARD -->
          <div class="staff-id-card back-card">
            <div class="staff-back-ribbon">
              <span>EMPLOYEE PARTICULARS • কর্মচারীর ব্যক্তিগত তথ্যাবলি</span>
            </div>

            <div class="staff-back-body">
              <table class="staff-back-table">
                <tr>
                  <td class="lbl">পিতার নাম</td>
                  <td class="sep">:</td>
                  <td class="val">${fatherName}</td>
                </tr>
                <tr>
                  <td class="lbl">মাতার নাম</td>
                  <td class="sep">:</td>
                  <td class="val">${motherName}</td>
                </tr>
                <tr>
                  <td class="lbl">জন্ম তারিখ</td>
                  <td class="sep">:</td>
                  <td class="val">${formatBnDate(person?.date_of_birth || '১৯৮৫-০১-০১')} খ্রি.</td>
                </tr>
                <tr>
                  <td class="lbl">জাতীয় পরিচয়পত্র</td>
                  <td class="sep">:</td>
                  <td class="val">${nid}</td>
                </tr>
                <tr>
                  <td class="lbl">যোগদানের তারিখ</td>
                  <td class="sep">:</td>
                  <td class="val">${formatBnDate(currentJoining)} খ্রি.</td>
                </tr>
                <tr>
                  <td class="lbl">স্থায়ী ঠিকানা</td>
                  <td class="sep">:</td>
                  <td class="val">${permanentAddress}</td>
                </tr>
              </table>

              <div class="card-instruction-note">
                <small>⚠️ এই কার্ডটি বিদ্যালয়ের সার্বক্ষণিক ব্যবহারের জন্য। কার্ডটি হারিয়ে গেলে তাৎক্ষণিক প্রধান শিক্ষক বরাবরে অবহিত করুন।</small>
              </div>
            </div>

            <div class="staff-back-footer">
              <div class="head-name">${signerName}</div>
              <div class="head-desig">${signerDesig}${school.phone ? ` • মোবাইল: ${toBengaliDigits(school.phone)}` : ''}</div>
              <div class="inst-name">${signerSchool}</div>
              <div class="inst-sub">ডাকঘরঃ মগড়া, উপজেলাঃ কালিহাতি, জেলাঃ টাঙ্গাইল।</div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  };

  // Persist office copies to localStorage
  const persistOfficeCopies = (newList) => {
    setOfficeCopies(newList);
    try {
      localStorage.setItem('magra_staff_certificate_office_copies', JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save staff office copies', e);
    }
  };

  // Generate official tracking reference number (e.g., OC-2026-0001)
  const generateRefNo = () => {
    const year = new Date().getFullYear();
    const countThisYear = officeCopies.filter(c => c.ref_no && c.ref_no.startsWith(`OC-${year}`)).length + 1;
    return `OC-${year}-${String(countThisYear).padStart(4, '0')}`;
  };

  // Save a soft office copy into local database
  const handleSaveOfficeCopy = (silent = false) => {
    if (!person) {
      alert('অনুগ্রহ করে একজন শিক্ষক বা কর্মচারী নির্বাচন করুন।');
      return null;
    }
    const currentDocHtml = generateDocumentHtml();
    const refNo = generateRefNo();
    const newRecord = {
      id: 'soc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      ref_no: refNo,
      memo_no: memoNo || 'স্মারক নং অনুল্লেখিত',
      issue_date: issueDate,
      saved_at: new Date().toISOString(),
      certificate_type: activeTab,
      certificate_title: STAFF_CERT_CONFIG[activeTab]?.title || activeTab,
      person_id: person.id,
      person_name_bn: personNameBn,
      person_name_en: personNameEn,
      employee_id: empId,
      designation: designation,
      subject: subject,
      phone: phone,
      email: email,
      blood_group: blood,
      nid: nid,
      gender: gender,
      photo: photo,
      custom_fields: {
        customMemoNo,
        issueDate,
        conductAppraisal,
        trainingSubject,
        trainingInstitute,
        trainingLocation,
        trainingStartDate,
        trainingEndDate,
        trainingDurationText,
        continuousServiceRemarks,
        officeNotes: officeNotes.trim()
      },
      document_html: currentDocHtml,
      status: 'active'
    };

    const updated = [newRecord, ...officeCopies];
    persistOfficeCopies(updated);

    if (!silent) {
      setSaveToast({
        type: 'success',
        msg: `✅ সফলভাবে সফট অফিস কপি জমা রাখা হয়েছে! (রেফারেন্স: ${refNo})`
      });
      setTimeout(() => setSaveToast(null), 3500);
    }
    return newRecord;
  };

  // Print triggered function
  const handlePrint = () => {
    const w = window.open('', '_blank', 'width=1000,height=850');
    if (!w) {
      alert('পপআপ ব্লক রয়েছে। অনুগ্রহ করে ব্রাউজার থেকে অনুমতি দিন।');
      return;
    }

    w.document.write(`
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="utf-8">
        <title>${memoNo || 'Certificate'} - ${personNameBn}</title>
        <style>
          ${staffDocumentStyles}
          body {
            background: #ffffff;
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
          }
          @media print {
            body { padding: 0; background: transparent; }
            .no-print { display: none !important; }
            .cert-card-sheet, .staff-id-card { box-shadow: none !important; border: 1px solid #475569 !important; }
            .doc-title-banner h2 {
              background: #f8fafc !important;
              color: #000000 !important;
              border: 1.5px solid #047857 !important;
              box-shadow: none !important;
              padding: 6px 28px !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .doc-title-banner .sub-title-en {
              color: #047857 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: ${activeTab === 'id_card' ? 'A4 portrait' : 'A4 portrait'};
              margin: 8mm 12mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          ${generateDocumentHtml()}
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    w.document.close();
  };

  // One-click Print and Save Office Copy
  const handlePrintAndSave = () => {
    const saved = handleSaveOfficeCopy(true);
    handlePrint();
    setSaveToast({
      type: 'success',
      msg: `🖨️ প্রিন্ট সম্পন্ন ও সফট অফিস কপি সংরক্ষিত হয়েছে! (${saved ? saved.ref_no : ''})`
    });
    setTimeout(() => setSaveToast(null), 4000);
  };

  // Re-print or print as official Office Copy from archive
  const handlePrintArchived = (record, asOfficeCopy = false) => {
    const w = window.open('', '_blank', 'width=1000,height=850');
    if (!w) {
      alert('পপআপ ব্লক রয়েছে। অনুগ্রহ করে ব্রাউজার থেকে অনুমতি দিন।');
      return;
    }

    const officeHeaderHtml = asOfficeCopy ? `
      <div class="office-copy-top-banner">
        <div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="background:#047857;color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;">📁 অফিস রেকর্ড কপি • OFFICE COPY</span>
            <span style="font-size:12px;font-weight:800;color:#064e3b;">রেফারেন্স: ${record.ref_no}</span>
          </div>
          <div style="font-size:11px;color:#334155;margin-top:3px;">
            স্মারক নং: <b>${record.memo_no}</b> • ইস্যু তারিখ: <b>${formatBnDate(record.issue_date)}</b> • সনদ: <b>${record.certificate_title}</b>
          </div>
        </div>
        <div style="text-align:right;font-size:11px;color:#475569;">
          <div>ডিজিটাল সংরক্ষণ: <b>${new Date(record.saved_at).toLocaleString('bn-BD')}</b></div>
          <div>গ্রহীতা: <b>${record.person_name_bn}</b> (${record.designation})</div>
        </div>
      </div>
    ` : '';

    const officeFooterHtml = asOfficeCopy ? `
      <div class="office-copy-bottom-meta">
        <div>
          <div>দাপ্তরিক রেজিস্টার পৃষ্ঠা নং: ____________________</div>
          <div style="margin-top:3px;">নথি/ফাইল নং: ____________________</div>
          <div style="margin-top:3px;color:#047857;font-weight:600;font-size:10px;">ডিজিটাল সফট কপি ডাটাবেসে নথিভুক্ত সংরক্ষিত</div>
        </div>
        <div style="text-align:center;">
          <div style="border-top:1px dotted #475569;width:140px;margin:18px auto 3px;"></div>
          <b>অফিস সহকারী / নথি রক্ষক</b>
        </div>
        <div style="text-align:right;">
          <div style="border-top:1px dotted #475569;width:150px;margin:18px 0 3px auto;"></div>
          <b>প্রতিষ্ঠান প্রধানের প্রতিস্বাক্ষর</b>
        </div>
      </div>
    ` : '';

    w.document.write(`
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="utf-8">
        <title>${asOfficeCopy ? '[অফিস কপি] ' : ''}${record.ref_no} - ${record.person_name_bn}</title>
        <style>
          ${staffDocumentStyles}
          body {
            background: #ffffff;
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
          }
          @media print {
            body { padding: 0; background: transparent; }
            .no-print { display: none !important; }
            .cert-card-sheet, .staff-id-card { box-shadow: none !important; border: 1px solid #475569 !important; }
            .doc-title-banner h2 {
              background: #f8fafc !important;
              color: #000000 !important;
              border: 1.5px solid #047857 !important;
              box-shadow: none !important;
              padding: 6px 28px !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .doc-title-banner .sub-title-en {
              color: #047857 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: ${record.certificate_type === 'id_card' ? 'A4 portrait' : 'A4 portrait'};
              margin: 8mm 12mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container" style="width: 100%; max-width: 820px; position: relative;">
          ${asOfficeCopy ? '<div class="office-copy-watermark">OFFICE COPY • অফিস কপি</div>' : ''}
          ${officeHeaderHtml}
          ${record.document_html}
          ${officeFooterHtml}
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    w.document.close();
  };

  // Download standalone HTML soft copy file
  const handleDownloadHtml = (record) => {
    const fullHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>${record.ref_no} - ${record.person_name_bn} - ${record.certificate_title}</title>
  <style>
    ${staffDocumentStyles}
    body { background: #ffffff; padding: 20px; margin: 0; display: flex; justify-content: center; }
    @media print {
      body { padding: 0; background: transparent; }
      .no-print { display: none !important; }
      .cert-card-sheet, .staff-id-card { box-shadow: none !important; border: 1px solid #475569 !important; }
            .doc-title-banner h2 {
              background: #f8fafc !important;
              color: #000000 !important;
              border: 1.5px solid #047857 !important;
              box-shadow: none !important;
              padding: 6px 28px !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .doc-title-banner .sub-title-en {
              color: #047857 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
      @page { size: A4 portrait; margin: 8mm 12mm; }
    }
  </style>
</head>
<body>
  <div class="print-container" style="max-width: 820px; margin: 0 auto;">
    ${record.document_html}
  </div>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (record.person_name_bn || 'staff').replace(/\s+/g, '_');
    a.download = `SoftCopy_${record.ref_no}_${safeName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export full CSV register of saved office copies
  const handleExportRegistryCSV = () => {
    if (!officeCopies.length) {
      alert('কোনো সংরক্ষিত রেকর্ড নেই।');
      return;
    }
    const headers = ['ক্রমিক', 'রেফারেন্স আইডি', 'স্মারক নং', 'ইস্যুর তারিখ', 'সনদের ধরন', 'শিক্ষক/কর্মচারীর নাম', 'ইংরেজি নাম', 'পদবি', 'বিষয়', 'মোবাইল', 'আইডি নম্বর', 'অফিস ট্র্যাকিং নোট', 'সংরক্ষণের সময়'];
    const rows = officeCopies.map((r, idx) => [
      idx + 1,
      `"${r.ref_no || ''}"`,
      `"${r.memo_no || ''}"`,
      `"${r.issue_date || ''}"`,
      `"${r.certificate_title || ''}"`,
      `"${r.person_name_bn || ''}"`,
      `"${r.person_name_en || ''}"`,
      `"${r.designation || ''}"`,
      `"${r.subject || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.employee_id || ''}"`,
      `"${(r.custom_fields?.officeNotes || '').replace(/"/g, '""')}"`,
      `"${new Date(r.saved_at).toLocaleString('bn-BD')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Staff_Certificates_Office_Copy_Registry_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export JSON backup of all office copies
  const handleExportJSON = () => {
    if (!officeCopies.length) {
      alert('কোনো সংরক্ষিত রেকর্ড নেই।');
      return;
    }
    const jsonStr = JSON.stringify(officeCopies, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Staff_Certificates_Archive_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (Array.isArray(data)) {
          const existingIds = new Set(officeCopies.map(c => c.id));
          const newItems = data.filter(d => !existingIds.has(d.id));
          const combined = [...newItems, ...officeCopies];
          persistOfficeCopies(combined);
          setSaveToast({
            type: 'success',
            msg: `✅ ব্যাকআপ থেকে ${newItems.length} টি রেকর্ড সফলভাবে ইমপোর্ট করা হয়েছে!`
          });
          setTimeout(() => setSaveToast(null), 3500);
        } else {
          alert('ফাইলটি সঠিক ফরম্যাটে নেই।');
        }
      } catch (err) {
        alert('ফাইল পড়তে ত্রুটি হয়েছে: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Delete an archived office copy
  const handleDeleteOfficeCopy = (id) => {
    const target = officeCopies.find(c => c.id === id);
    if (!target) return;
    if (!window.confirm(`আপনি কি নিশ্চিত যে "${target.person_name_bn}" এর জন্য সংরক্ষিত অফিস কপি (${target.ref_no}) মুছে ফেলতে চান?`)) {
      return;
    }
    const updated = officeCopies.filter(c => c.id !== id);
    persistOfficeCopies(updated);
    if (previewCopyModal?.id === id) {
      setPreviewCopyModal(null);
    }
    setSaveToast({
      type: 'success',
      msg: `🗑️ অফিস কপি (${target.ref_no}) সফলভাবে মুছে ফেলা হয়েছে।`
    });
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Filtered list for the Soft Office Copies Registrar & Archive
  const filteredOfficeCopies = useMemo(() => {
    return officeCopies.filter(c => {
      if (archiveTypeFilter !== 'all' && c.certificate_type !== archiveTypeFilter) return false;
      if (archivePersonFilter !== 'all' && String(c.person_id) !== String(archivePersonFilter)) return false;
      if (archiveSearch.trim()) {
        const q = archiveSearch.toLowerCase();
        const matchesName = (c.person_name_bn && c.person_name_bn.toLowerCase().includes(q)) ||
                            (c.person_name_en && c.person_name_en.toLowerCase().includes(q));
        const matchesMemo = c.memo_no && c.memo_no.toLowerCase().includes(q);
        const matchesRef = c.ref_no && c.ref_no.toLowerCase().includes(q);
        const matchesEmp = c.employee_id && String(c.employee_id).toLowerCase().includes(q);
        const matchesDesig = c.designation && c.designation.toLowerCase().includes(q);
        const matchesNote = c.custom_fields?.officeNotes && c.custom_fields.officeNotes.toLowerCase().includes(q);
        return matchesName || matchesMemo || matchesRef || matchesEmp || matchesDesig || matchesNote;
      }
      return true;
    });
  }, [officeCopies, archiveTypeFilter, archivePersonFilter, archiveSearch]);

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999, padding: '16px'
    }}>
      <div className="modal-card" style={{
        background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '1150px',
        maxHeight: '95vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', overflow: 'hidden', position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 70%, #059669 100%)',
          color: '#ffffff', padding: '16px 24px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
        }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9, fontWeight: 700 }}>
              OFFICIAL TEACHER & STAFF CERTIFICATE STUDIO • V120
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📜</span> শিক্ষক ও কর্মচারী প্রত্যয়ন, সনদ, ছাড়পত্র ও বায়োডাটা
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('office_copies')}
              style={{
                background: activeTab === 'office_copies' ? '#f0fdf4' : 'rgba(255, 255, 255, 0.15)',
                color: activeTab === 'office_copies' ? '#064e3b' : '#fff',
                border: activeTab === 'office_copies' ? '2px solid #86efac' : '1px solid rgba(255, 255, 255, 0.3)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
              title="সংরক্ষিত সকল সফট অফিস কপি দেখুন"
            >
              <span>📁</span> সংরক্ষিত অফিস কপি: <b>{officeCopies.length}</b> টি
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)', border: 'none', color: '#fff',
                fontSize: '20px', width: '36px', height: '36px', borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', transition: 'all 0.15s ease'
              }}
              title="বন্ধ করুন"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{
          padding: '10px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
          display: 'flex', gap: '8px', overflowX: 'auto', flexShrink: 0
        }}>
          {[
            ['bonafide', '📜 প্রত্যয়নপত্র'],
            ['experience', '🏆 অভিজ্ঞতার সনদ'],
            ['professional', '🎖️ পেশাগত সনদ'],
            ['continuous', '⏱️ নিরবিচ্ছিন্ন চাকুরী সনদ'],
            ['release_order', '✈️ প্রশিক্ষণ ছাড়পত্র'],
            ['biodata', '📄 আকর্ষণীয় বায়োডাটা (CV)'],
            ['id_card', '🪪 শিক্ষক পরিচয়পত্র'],
            ['office_copies', `📁 সংরক্ষিত অফিস কপি (${officeCopies.length})`]
          ].map(([k, label]) => {
            const isArchiveTab = k === 'office_copies';
            const isActive = activeTab === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setActiveTab(k)}
                style={{
                  padding: '7px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700,
                  border: isActive 
                    ? (isArchiveTab ? '2px solid #0f766e' : '2px solid #047857') 
                    : (isArchiveTab ? '1.5px solid #99f6e4' : '1px solid #cbd5e1'),
                  background: isActive 
                    ? (isArchiveTab ? 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)' : '#047857') 
                    : (isArchiveTab ? '#f0fdfa' : '#ffffff'),
                  color: isActive ? '#ffffff' : (isArchiveTab ? '#0f766e' : '#334155'),
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Controls Bar for Document Builder */}
        {activeTab !== 'office_copies' && (
          <div style={{
            padding: '12px 20px', background: '#f1f5f9', borderBottom: '1px solid #cbd5e1',
            display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '320px', flexWrap: 'wrap' }}>
              <div style={{ minWidth: '180px', flex: 1 }}>
                <input
                  type="text"
                  placeholder="🔍 শিক্ষক খুঁজুন..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                />
              </div>
              <div style={{ minWidth: '240px', flex: 1.5 }}>
                <select
                  value={selectedPersonId}
                  onChange={e => setSelectedPersonId(e.target.value)}
                  style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 600, fontSize: '12.5px' }}
                >
                  {filteredPeople.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name_bn || p.name} ({p.designation || 'শিক্ষক'} {p.subject ? `• ${p.subject}` : ''}) - ID: {p.employee_id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleSaveOfficeCopy()}
                style={{
                  background: '#ffffff',
                  color: '#047857',
                  border: '1.5px solid #047857',
                  padding: '7px 13px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
                title="প্রিন্ট না করে শুধু সফট অফিস কপি জমা রাখুন"
              >
                💾 সফট অফিস কপি জমা রাখুন
              </button>

              <button
                type="button"
                onClick={handlePrintAndSave}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 4px rgba(4, 120, 87, 0.25)'
                }}
                title="সফট অফিস কপি সংরক্ষণ এবং সরাসরি প্রিন্ট/PDF করুন"
              >
                🖨️ প্রিন্ট ও অফিস কপি সংরক্ষণ
              </button>

              <button
                type="button"
                onClick={handlePrint}
                style={{
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  padding: '7px 11px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="সংরক্ষণ ব্যতিত শুধুমাত্র প্রিন্ট করুন"
              >
                🖨️ শুধু প্রিন্ট
              </button>
            </div>
          </div>
        )}

        {/* Modal Body: Active Tab View */}
        {activeTab === 'office_copies' ? (
          /* ============================================================== */
          /* SOFT OFFICE COPIES REGISTRAR & ARCHIVE VIEW                     */
          /* ============================================================== */
          <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', background: '#f8fafc' }}>
            {/* Top Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
              <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)', color: '#fff', padding: '12px 16px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(4,120,87,0.2)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>মোট সংরক্ষিত অফিস কপি</div>
                <div style={{ fontSize: '24px', fontWeight: 900, marginTop: '2px' }}>{officeCopies.length} টি</div>
                <div style={{ fontSize: '10.5px', opacity: 0.85, marginTop: '2px' }}>ডিজিটাল অফিস নথিভুক্ত</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', padding: '12px 16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857' }}>📜 প্রত্যয়নপত্র</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#064e3b', marginTop: '2px' }}>
                  {officeCopies.filter(c => c.certificate_type === 'bonafide').length} টি
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>Bonafide Certificates</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #fde68a', padding: '12px 16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#b45309' }}>🏆 অভিজ্ঞতার সনদ</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#78350f', marginTop: '2px' }}>
                  {officeCopies.filter(c => c.certificate_type === 'experience').length} টি
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>Experience Certificates</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #99f6e4', padding: '12px 16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0d9488' }}>🎖️ পেশাগত ও নিরবিচ্ছিন্ন</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#134e4a', marginTop: '2px' }}>
                  {officeCopies.filter(c => c.certificate_type === 'professional' || c.certificate_type === 'continuous').length} টি
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>Professional & Service</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #fed7aa', padding: '12px 16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#c2410c' }}>✈️ প্রশিক্ষণ ছাড়পত্র ও অন্যান্য</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#7c2d12', marginTop: '2px' }}>
                  {officeCopies.filter(c => c.certificate_type === 'release_order' || c.certificate_type === 'biodata' || c.certificate_type === 'id_card').length} টি
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>Release & ID Cards</div>
              </div>
            </div>

            {/* Filter & Action Toolbar */}
            <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '320px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '220px', flex: 1.5 }}>
                  <input
                    type="text"
                    placeholder="🔍 নাম, পদবি, স্মারক নং, রেফারেন্স বা নোট খুঁজুন..."
                    value={archiveSearch}
                    onChange={e => setArchiveSearch(e.target.value)}
                    style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                </div>
                <div style={{ minWidth: '180px', flex: 1 }}>
                  <select
                    value={archiveTypeFilter}
                    onChange={e => setArchiveTypeFilter(e.target.value)}
                    style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600 }}
                  >
                    <option value="all">সব ধরনের সনদ ও ডকুমেন্ট</option>
                    <option value="bonafide">📜 প্রত্যয়নপত্র</option>
                    <option value="experience">🏆 অভিজ্ঞতার সনদ</option>
                    <option value="professional">🎖️ পেশাগত সনদ</option>
                    <option value="continuous">⏱️ নিরবিচ্ছিন্ন চাকুরী সনদ</option>
                    <option value="release_order">✈️ প্রশিক্ষণ ছাড়পত্র</option>
                    <option value="biodata">📄 আকর্ষণীয় বায়োডাটা (CV)</option>
                    <option value="id_card">🪪 শিক্ষক পরিচয়পত্র</option>
                  </select>
                </div>
                <div style={{ minWidth: '180px', flex: 1 }}>
                  <select
                    value={archivePersonFilter}
                    onChange={e => setArchivePersonFilter(e.target.value)}
                    style={{ width: '100%', padding: '7px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600 }}
                  >
                    <option value="all">সকল শিক্ষক ও কর্মচারী ({people.length})</option>
                    {people.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name_bn || p.name} ({p.designation || 'শিক্ষক'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleExportRegistryCSV}
                  style={{
                    background: '#ffffff', color: '#047857', border: '1px solid #047857',
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px'
                  }}
                  title="সংরক্ষিত অফিস কপির পূর্ণাঙ্গ রেজিস্টার CSV ডাউনলোড করুন"
                >
                  📥 রেজিস্টার CSV
                </button>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  style={{
                    background: '#ffffff', color: '#0369a1', border: '1px solid #0369a1',
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px'
                  }}
                  title="ডিজিটাল আর্কাইভের পূর্ণাঙ্গ ব্যাকআপ JSON ফাইল ডাউনলোড করুন"
                >
                  💾 JSON ব্যাকআপ
                </button>
                <label
                  style={{
                    background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1',
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px'
                  }}
                  title="পূর্ববর্তী ব্যাকআপ JSON থেকে ডাটা ইমপোর্ট করুন"
                >
                  📤 ইমপোর্ট
                  <input type="file" accept=".json,application/json" hidden onChange={handleImportJSON} />
                </label>
              </div>
            </div>

            {/* Registrar Table */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #cbd5e1', overflowX: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              {filteredOfficeCopies.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
                  <div style={{ fontSize: '42px', marginBottom: '10px' }}>📁</div>
                  <h3 style={{ margin: '0 0 6px', color: '#1e293b', fontSize: '16px', fontWeight: 700 }}>কোনো সফট অফিস কপি পাওয়া যায়নি</h3>
                  <p style={{ margin: '0 0 16px', fontSize: '13px', maxWidth: '480px', marginInline: 'auto' }}>
                    {officeCopies.length === 0 
                      ? 'আপনি যে কোনো সনদে গিয়ে "💾 সফট অফিস কপি জমা রাখুন" বা "🖨️ প্রিন্ট ও অফিস কপি সংরক্ষণ" বাটনে ক্লিক করলে তা স্বয়ংক্রিয়ভাবে এখানে অফিস রেকর্ড ফাইল হিসেবে সংরক্ষিত থাকবে।'
                      : 'অনুসন্ধানের শর্তের সাথে মিলে এমন কোনো অফিস কপি পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে সন্ধান করুন।'}
                  </p>
                  {officeCopies.length === 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('bonafide')}
                      style={{
                        background: '#047857', color: '#fff', border: 'none', padding: '8px 18px',
                        borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
                      }}
                    >
                      📜 প্রথম প্রত্যয়নপত্র তৈরি ও অফিস কপি সংরক্ষণ করুন
                    </button>
                  )}
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1', color: '#0f172a' }}>
                      <th style={{ padding: '10px 12px', width: '105px', textAlign: 'center' }}>রেফারেন্স নং</th>
                      <th style={{ padding: '10px 12px', width: '140px' }}>স্মারক ও তারিখ</th>
                      <th style={{ padding: '10px 12px', minWidth: '190px' }}>শিক্ষক / কর্মচারী</th>
                      <th style={{ padding: '10px 12px', width: '160px' }}>সনদের ধরন</th>
                      <th style={{ padding: '10px 12px', minWidth: '180px' }}>নোট / বিবরণ</th>
                      <th style={{ padding: '10px 12px', width: '140px', textAlign: 'center' }}>সংরক্ষণের সময়</th>
                      <th style={{ padding: '10px 12px', width: '220px', textAlign: 'center' }}>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOfficeCopies.map((item, idx) => {
                      const cfg = STAFF_CERT_CONFIG[item.certificate_type] || {
                        label: item.certificate_title || item.certificate_type,
                        color: '#047857',
                        bg: '#ecfdf5',
                        border: '#a7f3d0'
                      };
                      return (
                        <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#fbfcfd' }}>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>#{idx + 1}</div>
                            <span style={{
                              fontFamily: 'monospace', fontWeight: 800, color: '#047857',
                              background: '#ecfdf5', padding: '3px 6px', borderRadius: '4px',
                              border: '1px solid #a7f3d0', fontSize: '11px', display: 'inline-block', marginTop: '2px'
                            }}>
                              {item.ref_no}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: 600, color: '#1e293b' }}>
                              {item.memo_no ? `স্মারক: ${item.memo_no}` : 'স্মারক অনুল্লেখিত'}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                              ইস্যু: {formatBnDate(item.issue_date)}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <img
                                src={item.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                                alt=""
                                style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'; }}
                              />
                              <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.person_name_bn}</div>
                                <div style={{ fontSize: '11px', color: '#475569' }}>
                                  {item.designation} {item.subject ? `• ${item.subject}` : ''}
                                  {item.employee_id ? ` (ID: ${item.employee_id})` : ''}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{
                              background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                              padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                              display: 'inline-flex', alignItems: 'center', gap: '4px'
                            }}>
                              {cfg.label}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontSize: '11.5px', color: '#334155' }}>
                              {item.custom_fields?.officeNotes ? (
                                <span style={{ fontWeight: 600, color: '#0f766e' }}>📌 {item.custom_fields.officeNotes}</span>
                              ) : item.custom_fields?.trainingSubject ? (
                                <span>✈️ {item.custom_fields.trainingSubject.slice(0, 45)}...</span>
                              ) : item.custom_fields?.conductAppraisal ? (
                                <span>চরিত্র: {item.custom_fields.conductAppraisal}</span>
                              ) : (
                                <span style={{ color: '#94a3b8' }}>—</span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>
                            <div>{formatBnDate(item.saved_at.slice(0, 10))}</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '1px' }}>
                              {new Date(item.saved_at).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={() => { setPreviewCopyModal(item); setPreviewCopyFormat('office'); }}
                                style={{
                                  background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
                                  padding: '4px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 700,
                                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px'
                                }}
                                title="সংরক্ষিত অফিস কপি বিস্তারিত দেখুন"
                              >
                                👁️ দেখুন
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePrintArchived(item, false)}
                                style={{
                                  background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1',
                                  padding: '4px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 600,
                                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px'
                                }}
                                title="মূল সনদপত্র প্রিন্ট করুন"
                              >
                                🖨️ প্রিন্ট
                              </button>
                              <button
                                type="button"
                                onClick={() => handlePrintArchived(item, true)}
                                style={{
                                  background: '#f0fdf4', color: '#047857', border: '1px solid #a7f3d0',
                                  padding: '4px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 700,
                                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px'
                                }}
                                title="অফিস রেকর্ড কপি ফরম্যাটে প্রিন্ট করুন (সিলমোহর ও স্বাক্ষর বক্স সহ)"
                              >
                                📑 অফিস কপি
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownloadHtml(item)}
                                style={{
                                  background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd',
                                  padding: '4px 6px', borderRadius: '5px', fontSize: '11px', fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                                title="সফট HTML ফাইল ডাউনলোড করুন"
                              >
                                📥
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteOfficeCopy(item.id)}
                                style={{
                                  background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
                                  padding: '4px 6px', borderRadius: '5px', fontSize: '11px', fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                                title="রেকর্ডটি মুছে ফেলুন"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* STANDARD CERTIFICATE BUILDER & LIVE PREVIEW                    */
          /* ============================================================== */
          <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* Left Panel: Contextual Customization Controls */}
            <div style={{ width: '310px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '13.5px', fontWeight: 700, color: '#047857' }}>⚙️ ডকুমেন্টের সাধারণ তথ্য</h4>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '3px' }}>স্মারক নংঃ</label>
                  <input
                    type="text"
                    placeholder="স্মারক নং (ঐচ্ছিক)"
                    value={customMemoNo}
                    onChange={e => setCustomMemoNo(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600 }}
                  />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '3px' }}>ইস্যুর তারিখ</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={e => setIssueDate(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '3px' }}>মূল্যায়ন ও চরিত্র সনদ মন্তব্য</label>
                  <input
                    type="text"
                    value={conductAppraisal}
                    onChange={e => setConductAppraisal(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>

                <div style={{ marginTop: '10px', padding: '8px 10px', background: isHeadTeacher ? '#fef3c7' : '#ecfdf5', borderRadius: '6px', border: isHeadTeacher ? '1px solid #fde68a' : '1px solid #a7f3d0' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: isHeadTeacher ? '#92400e' : '#065f46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{isHeadTeacher ? '👑' : '✍️'}</span>
                    <span>{isHeadTeacher ? 'প্রত্যয়নকারী কর্তৃপক্ষ: সভাপতি' : 'প্রত্যয়নকারী কর্তৃপক্ষ: প্রতিষ্ঠান প্রধান'}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: isHeadTeacher ? '#78350f' : '#047857', marginTop: '2px', fontWeight: 600 }}>
                    {signerName} • {signerDesig} ({signerSchool})
                  </div>
                </div>

                {/* Soft Office Copy Notes & Quick Action */}
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#047857', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <span>📁</span> অফিস ট্র্যাকিং নোট (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: MPO টাইম স্কেল / পাসপোর্ট / ব্যাংক লোন / ব্যক্তিগত"
                    value={officeNotes}
                    onChange={e => setOfficeNotes(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '11.5px', marginBottom: '8px' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveOfficeCopy()}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    💾 এই কপির সফট অফিস কপি জমা রাখুন
                  </button>
                </div>
              </div>

              {/* If Training Release Order, show full customizable training inputs */}
              {activeTab === 'release_order' && (
                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '14px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '13.5px', fontWeight: 700, color: '#166534' }}>✈️ প্রশিক্ষণ ছাড়পত্রের তথ্য (আবশ্যক)</h4>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '3px' }}>ট্রেনিং এর বিষয় *</label>
                    <textarea
                      rows={2}
                      value={trainingSubject}
                      onChange={e => setTrainingSubject(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '5px', border: '1px solid #86efac', fontSize: '12px', resize: 'vertical' }}
                      placeholder="যেমন: নতুন জাতীয় শিক্ষাক্রম বিস্তরণ ও বিষয়ভিত্তিক শ্রেণি মূল্যায়ন প্রশিক্ষণ"
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '3px' }}>প্রশিক্ষণ প্রতিষ্ঠানের নাম *</label>
                    <input
                      type="text"
                      value={trainingInstitute}
                      onChange={e => setTrainingInstitute(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '5px', border: '1px solid #86efac', fontSize: '12px' }}
                      placeholder="যেমন: সরকারি টিচার্স ট্রেনিং কলেজ (TTC), ময়মনসিংহ"
                    />
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '3px' }}>প্রতিষ্ঠানের ঠিকানা *</label>
                    <input
                      type="text"
                      value={trainingLocation}
                      onChange={e => setTrainingLocation(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '5px', border: '1px solid #86efac', fontSize: '12px' }}
                      placeholder="যেমন: কালিহাতি, টাঙ্গাইল"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <div>
                      <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '2px' }}>শুরুর তারিখ *</label>
                      <input
                        type="date"
                        value={trainingStartDate}
                        onChange={e => setTrainingStartDate(e.target.value)}
                        style={{ width: '100%', padding: '5px 6px', borderRadius: '5px', border: '1px solid #86efac', fontSize: '11px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '2px' }}>শেষের তারিখ *</label>
                      <input
                        type="date"
                        value={trainingEndDate}
                        onChange={e => setTrainingEndDate(e.target.value)}
                        style={{ width: '100%', padding: '5px 6px', borderRadius: '5px', border: '1px solid #86efac', fontSize: '11px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '3px' }}>প্রশিক্ষণ স্থিতিকাল</label>
                    <input
                      type="text"
                      value={trainingDurationText}
                      onChange={e => setTrainingDurationText(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '5px', border: '1px solid #86efac', fontSize: '12px' }}
                      placeholder="যেমন: ৬ দিনব্যাপী / ১৪ দিনব্যাপী"
                    />
                  </div>
                </div>
              )}

              {/* If Continuous Service, show continuous service remark */}
              {activeTab === 'continuous' && (
                <div style={{ background: '#fdf4ff', border: '1.5px solid #f0abfc', borderRadius: '10px', padding: '14px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '13.5px', fontWeight: 700, color: '#86198f' }}>⏱️ নিরবিচ্ছিন্ন চাকুরীর মন্তব্য</h4>
                  <textarea
                    rows={3}
                    value={continuousServiceRemarks}
                    onChange={e => setContinuousServiceRemarks(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '5px', border: '1px solid #f0abfc', fontSize: '12px', resize: 'vertical' }}
                  />
                </div>
              )}

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '12px', fontSize: '12px', color: '#1e40af' }}>
                💡 <b>অফিস পরামর্শ:</b> "প্রিন্ট ও অফিস কপি সংরক্ষণ" বাটনে চাপ দিলে স্বয়ংক্রিয়ভাবে সফট অফিস কপি জমা থাকবে এবং তাৎক্ষণিক প্রিন্ট রেডি কপি বের হবে।
              </div>
            </div>

            {/* Right Panel: Live Document Preview */}
            <div style={{ flex: 1, minWidth: '340px', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
              <div
                className="live-document-preview-box"
                style={{ width: '100%', maxWidth: activeTab === 'id_card' ? '700px' : '760px' }}
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>${staffDocumentStyles}</style>
                    ${generateDocumentHtml()}
                  `
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: '10px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>
            {school.nameBn} • শিক্ষক ও কর্মচারী অফিশিয়াল ডকুমেন্ট ম্যানেজমেন্ট পোর্টাল
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px 18px', borderRadius: '6px', border: '1px solid #cbd5e1',
              background: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer'
            }}
          >
            বন্ধ করুন
          </button>
        </div>

        {/* Toast Alert Notification */}
        {saveToast && (
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: saveToast.type === 'error' ? '#ef4444' : '#064e3b',
            color: '#ffffff',
            padding: '10px 22px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 600,
            fontSize: '13px',
            border: '1.5px solid rgba(255, 255, 255, 0.3)'
          }}>
            <span>{saveToast.msg}</span>
            <button
              type="button"
              onClick={() => { setActiveTab('office_copies'); setSaveToast(null); }}
              style={{
                background: '#10b981',
                border: 'none',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '5px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              রেজিস্টারে দেখুন →
            </button>
            <button
              type="button"
              onClick={() => setSaveToast(null)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '15px', cursor: 'pointer', opacity: 0.8 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Detailed Office Copy Preview Modal */}
        {previewCopyModal && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)', zIndex: 10005, display: 'flex',
            justifyContent: 'center', alignItems: 'center', padding: '16px'
          }}>
            <div style={{
              background: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '960px',
              maxHeight: '94vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            }}>
              {/* Preview Modal Header */}
              <div style={{
                background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
                color: '#ffffff', padding: '14px 20px', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '0.8px', textTransform: 'uppercase', opacity: 0.9, fontWeight: 700 }}>
                    সংরক্ষিত সফট অফিস কপি প্রিভিউ • {previewCopyModal.ref_no}
                  </div>
                  <h3 style={{ margin: '2px 0 0', fontSize: '17px', fontWeight: 800 }}>
                    {previewCopyModal.person_name_bn} ({previewCopyModal.designation}) — {previewCopyModal.certificate_title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewCopyModal(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
                    fontSize: '18px', width: '32px', height: '32px', borderRadius: '50%',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Preview Format Switcher & Action Buttons */}
              <div style={{
                padding: '10px 20px', background: '#f1f5f9', borderBottom: '1px solid #cbd5e1',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'
              }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>প্রিভিউ ফরম্যাট:</span>
                  <button
                    type="button"
                    onClick={() => setPreviewCopyFormat('office')}
                    style={{
                      padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                      border: previewCopyFormat === 'office' ? '1.5px solid #0f766e' : '1px solid #cbd5e1',
                      background: previewCopyFormat === 'office' ? '#0f766e' : '#fff',
                      color: previewCopyFormat === 'office' ? '#fff' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    📑 অফিস রেকর্ড কপি (সিলমোহর ও ওয়াটারমার্ক সহ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewCopyFormat('original')}
                    style={{
                      padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                      border: previewCopyFormat === 'original' ? '1.5px solid #0f766e' : '1px solid #cbd5e1',
                      background: previewCopyFormat === 'original' ? '#0f766e' : '#fff',
                      color: previewCopyFormat === 'original' ? '#fff' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    📄 মূল কপি (ক্লিন)
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handlePrintArchived(previewCopyModal, false)}
                    style={{
                      background: '#ffffff', color: '#334155', border: '1px solid #cbd5e1',
                      padding: '6px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '12px',
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px'
                    }}
                  >
                    🖨️ মূল কপি প্রিন্ট
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrintArchived(previewCopyModal, true)}
                    style={{
                      background: '#047857', color: '#fff', border: 'none',
                      padding: '6px 14px', borderRadius: '6px', fontWeight: 700, fontSize: '12px',
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px'
                    }}
                  >
                    📑 অফিস কপি প্রিন্ট
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadHtml(previewCopyModal)}
                    style={{
                      background: '#0284c7', color: '#fff', border: 'none',
                      padding: '6px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '12px',
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px'
                    }}
                  >
                    📥 HTML ডাউনলোড
                  </button>
                </div>
              </div>

              {/* Modal Body: Document Preview */}
              <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: '100%', maxWidth: '780px', position: 'relative' }}>
                  {previewCopyFormat === 'office' && (
                    <div style={{
                      background: '#ecfdf5', border: '1.5px dashed #059669', borderRadius: '6px',
                      padding: '8px 14px', marginBottom: '12px', display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px'
                    }}>
                      <div>
                        <span style={{ background: '#059669', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase' }}>
                          অফিস কপি • OFFICE COPY
                        </span>
                        <span style={{ fontWeight: 800, color: '#064e3b', marginLeft: '8px' }}>
                          রেফারেন্স: {previewCopyModal.ref_no}
                        </span>
                        <span style={{ color: '#475569', marginLeft: '10px' }}>
                          স্মারক নং: {previewCopyModal.memo_no} • ইস্যু: {formatBnDate(previewCopyModal.issue_date)}
                        </span>
                      </div>
                      <div style={{ color: '#64748b', fontSize: '11px' }}>
                        সংরক্ষণ: {new Date(previewCopyModal.saved_at).toLocaleString('bn-BD')}
                      </div>
                    </div>
                  )}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                        <style>${staffDocumentStyles}</style>
                        ${previewCopyModal.document_html}
                      `
                    }}
                  />

                  {previewCopyFormat === 'office' && (
                    <div style={{
                      marginTop: '16px', paddingTop: '10px', borderTop: '1.5px dashed #94a3b8',
                      display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569'
                    }}>
                      <div>
                        <div>দাপ্তরিক রেজিস্টার পৃষ্ঠা নং: ____________________</div>
                        <div style={{ marginTop: '2px' }}>নথি/ফাইল নং: ____________________</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ borderTop: '1px dotted #64748b', width: '130px', margin: '14px auto 2px' }}></div>
                        <b>অফিস সহকারী / নথি রক্ষক</b>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ borderTop: '1px dotted #64748b', width: '140px', margin: '14px 0 2px auto' }}></div>
                        <b>প্রতিষ্ঠান প্রধানের প্রতিস্বাক্ষর</b>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const staffDocumentStyles = `
  ${SCHOOL_PAD_STYLES}

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;700&display=swap');

  * { box-sizing: border-box; }

  /* CERTIFICATE SHEETS */
  .cert-card-sheet {
    background: #ffffff;
    border: 2px solid #064e3b;
    border-radius: 8px;
    padding: 12px;
    font-family: 'Noto Sans Bengali', Arial, sans-serif;
    color: #0f172a;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    position: relative;
    box-sizing: border-box;
  }

  .cert-inner-border {
    border: 1.5px solid #047857;
    padding: 24px 28px 20px;
    border-radius: 6px;
    position: relative;
  }

  .doc-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    border-bottom: 2px solid #064e3b;
    padding-bottom: 12px;
    text-align: center;
  }

  .doc-logo {
    width: 68px;
    height: 68px;
    object-fit: contain;
    border-radius: 50%;
  }

  .doc-school-meta h1.school-name-title {
    margin: 0;
    font-size: 24px;
    font-weight: 900;
    color: #064e3b;
    line-height: 1.2;
  }

  .doc-school-meta h3.school-name-en-title {
    margin: 2px 0 0;
    font-size: 13.5px;
    font-family: 'Outfit', sans-serif;
    color: #0284c7;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .school-sub-info {
    margin: 3px 0 0;
    font-size: 11.5px;
    color: #334155;
    font-weight: 600;
  }

  .school-contact-info {
    margin: 2px 0 0;
    font-size: 10.5px;
    color: #64748b;
  }

  .doc-meta-row {
    display: flex;
    justify-content: space-between;
    margin: 12px 0 16px;
    font-size: 12.5px;
    font-weight: 600;
    color: #1e293b;
    border-bottom: 1px dashed #cbd5e1;
    padding-bottom: 6px;
  }

  .doc-title-banner {
    text-align: center;
    margin: 16px auto 20px;
    max-width: 440px;
  }

  .doc-title-banner h2 {
    margin: 0;
    font-size: 21px;
    font-weight: 900;
    color: #0f172a;
    background: #f0fdf4;
    padding: 6px 28px;
    border-radius: 30px;
    display: inline-block;
    border: 2px solid #047857;
    box-shadow: 0 2px 6px rgba(4, 120, 87, 0.12);
    letter-spacing: 1px;
  }

  .doc-title-banner .sub-title-en {
    display: block;
    margin-top: 5px;
    font-size: 10px;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    color: #047857;
    letter-spacing: 0.8px;
  }

  .doc-body-text {
    line-height: 1.85;
    font-size: 14px;
    text-align: justify;
    color: #1e293b;
  }

  .doc-para {
    margin: 0 0 12px;
    text-indent: 28px;
  }

  .closing-para {
    margin-top: 14px;
  }

  .service-table-wrap {
    margin: 14px 0;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    overflow: hidden;
  }

  .cert-info-grid {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }

  .cert-info-grid td {
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
  }

  .cert-info-grid td.col-lbl {
    background: #f8fafc;
    font-weight: 700;
    color: #475569;
    width: 25%;
  }

  .cert-info-grid td.col-val {
    color: #0f172a;
    width: 25%;
  }

  /* Training Release Order Box */
  .training-highlight-box {
    background: #f0fdf4;
    border: 1.5px solid #86efac;
    border-radius: 8px;
    padding: 12px 14px;
    margin: 14px 0;
  }

  .training-details-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  .training-details-table td {
    padding: 5px 4px;
    vertical-align: top;
  }

  .training-details-table td.t-lbl {
    width: 210px;
    font-weight: 700;
    color: #166534;
  }

  .training-details-table td.t-val {
    color: #0f172a;
  }

  .t-title {
    color: #065f46;
    font-size: 13.5px;
  }

  .conditions-box {
    background: #fafaf9;
    border-left: 3px solid #047857;
    padding: 8px 14px;
    font-size: 11.5px;
    margin: 12px 0;
    color: #334155;
  }

  .conditions-box ol {
    margin: 4px 0 0 16px;
    padding: 0;
  }

  .conditions-box li {
    margin-bottom: 2px;
  }

  .copy-forward-box {
    margin-top: 25px;
    padding-top: 10px;
    border-top: 1px dashed #cbd5e1;
    font-size: 10.5px;
    color: #475569;
    line-height: 1.5;
  }

  .doc-sign-area {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 48px;
    page-break-inside: avoid;
  }

  .sign-block {
    text-align: center;
    min-width: 190px;
    max-width: 250px;
    font-size: 12.5px;
    color: #0f172a;
  }

  .sign-block.seal-space {
    width: 140px;
  }

  .official-seal-box {
    border: 1.5px dashed #94a3b8;
    border-radius: 50%;
    width: 85px;
    height: 85px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #94a3b8;
    text-align: center;
  }

  .sign-line {
    border-top: 1.5px dashed #0f172a;
    margin-bottom: 4px;
  }

  .sign-block span {
    display: block;
    font-size: 11px;
    color: #475569;
  }

  /* ==================================================================== */
  /* NEW OFFICIAL INSTITUTIONAL BIODATA (CV) STYLES - EXACT MATCH IMAGE 2 */
  /* ==================================================================== */
  .biodata-official-sheet {
    background: #ffffff;
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    padding: 24px 28px;
    box-sizing: border-box;
    font-family: 'Hind Siliguri', 'SolaimanLipi', sans-serif;
    color: #000000;
  }

  .cv-title-wrap {
    text-align: center;
    margin-bottom: 12px;
  }

  .cv-title-box {
    display: inline-block;
    border: 1.5px solid #133e68;
    padding: 4px 28px;
    font-size: 19px;
    font-weight: 800;
    color: #0f2e5a;
    letter-spacing: 0.5px;
    background: #ffffff;
  }

  .cv-profile-box {
    border: 1.5px solid #133e68;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    background: #ffffff;
  }

  .cv-profile-info {
    flex: 1;
  }

  .cv-name-bn {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: #000000;
    line-height: 1.25;
  }

  .cv-name-en {
    margin: 4px 0 0;
    font-size: 14.5px;
    font-weight: 800;
    color: #0f2e5a;
    letter-spacing: 0.5px;
    font-family: 'Outfit', sans-serif;
  }

  .cv-desig-school {
    margin-top: 6px;
    font-size: 13.5px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.35;
  }

  .cv-photo-frame {
    width: 100px;
    height: 120px;
    border: 1.5px solid #133e68;
    flex-shrink: 0;
    overflow: hidden;
    background: #f8fafc;
    margin-left: 14px;
  }

  .cv-photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cv-sec-title {
    font-size: 13.5px;
    font-weight: 800;
    color: #000000;
    margin: 12px 0 3px 0;
    letter-spacing: 0.2px;
  }

  .cv-table {
    width: 100%;
    border-collapse: collapse;
    border: 1.5px solid #133e68;
    font-size: 12px;
    page-break-inside: avoid;
    background: #ffffff;
  }

  .cv-table th, .cv-table td {
    border: 1px solid #133e68;
    padding: 4.5px 8px;
    vertical-align: middle;
    line-height: 1.4;
  }

  .cv-table thead tr {
    background: #133e68 !important;
    color: #ffffff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .cv-table th {
    font-weight: 700;
    color: #ffffff;
    font-size: 12px;
    letter-spacing: 0.3px;
  }

  .cv-lbl {
    font-weight: 600;
    color: #000000;
    background: #ffffff;
  }

  .cv-val {
    color: #0f172a;
  }

  .cv-val-email {
    color: #0284c7;
    text-decoration: underline;
    font-weight: 600;
  }

  .cv-val-blood {
    color: #b91c1c;
    font-weight: 800;
  }

  .cv-sub-item {
    padding: 4px 8px;
    border-bottom: 1px solid #133e68;
  }
  .cv-sub-item:last-child {
    border-bottom: none;
  }

  .cv-signature-area {
    margin-top: 28px;
    font-size: 13px;
    font-weight: 700;
    color: #000000;
    page-break-inside: avoid;
  }

  /* Legacy biodata-sheet alias */
  .biodata-sheet {
    padding: 24px 28px;
  }

  /* STAFF ID CARD (CR-80 Format) */
  .staff-id-card-wrap {
    display: flex;
    gap: 20px;
    justify-content: center;
    font-family: 'Noto Sans Bengali', Arial, sans-serif;
  }

  .staff-id-card {
    width: 335px;
    height: 525px;
    max-height: 525px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #cbd5e1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }

  .staff-card-header {
    background: linear-gradient(135deg, #064e3b 0%, #047857 70%, #059669 100%);
    color: #ffffff;
    padding: 8px 10px 7px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 2px solid #fbbf24;
  }

  .staff-logo {
    width: 58px;
    height: 58px;
    object-fit: contain;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .staff-school-meta {
    flex: 1;
    text-align: center;
  }

  .staff-school-bn {
    margin: 0;
    font-size: 15px;
    font-weight: 900;
    line-height: 1.25;
  }

  .staff-school-en {
    margin: 1.5px 0 0;
    font-size: 9.5px;
    font-family: 'Outfit', sans-serif;
    color: #fef08a;
  }

  .staff-school-sub {
    margin: 2px 0 0;
    font-size: 8.5px;
    color: #d1fae5;
  }

  .staff-card-ribbon {
    background: #0f172a;
    color: #38bdf8;
    text-align: center;
    font-size: 11px;
    font-weight: 800;
    padding: 3.5px 4px;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #334155;
  }

  .staff-card-body {
    flex: 1;
    padding: 8px 14px 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .staff-photo-frame {
    width: 140px;
    height: 168px;
    border-radius: 9px;
    border: 2.5px solid #047857;
    overflow: hidden;
    background: #f1f5f9;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  .staff-photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .staff-title-wrap {
    text-align: center;
    margin: 4px 0 2px;
  }

  .staff-name-bn {
    font-size: 21px;
    font-weight: 900;
    color: #064e3b;
    line-height: 1.2;
  }

  .staff-name-en {
    font-size: 11px;
    font-family: 'Outfit', sans-serif;
    color: #0284c7;
    font-weight: 700;
  }

  .staff-desig-tag {
    margin-top: 3px;
    background: #ecfdf5;
    color: #047857;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 800;
    border: 1px solid #a7f3d0;
    display: inline-block;
  }

  .staff-table {
    width: 100%;
    max-width: 295px;
    font-size: 12px;
    border-collapse: collapse;
    margin-top: 2px;
  }

  .staff-table td {
    padding: 4px 3px;
  }

  .staff-table td.lbl {
    width: 100px;
    color: #475569;
    font-weight: 700;
  }

  .staff-table td.sep {
    width: 10px;
    text-align: center;
    font-weight: 700;
    color: #64748b;
  }

  .staff-table td.val {
    font-weight: 600;
    color: #0f172a;
  }

  .index-num {
    color: #b91c1c;
    font-size: 12.5px;
  }

  .mono-phone {
    font-family: monospace;
    font-size: 12px;
    color: #0369a1;
  }

  .blood-pill {
    background: #fef2f2;
    border: 1px solid #f87171;
    color: #b91c1c;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 10.5px;
    font-weight: 800;
  }

  .staff-card-footer {
    padding: 6px 14px 6px;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .barcode-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .barcode-bars {
    font-family: monospace;
    letter-spacing: 2px;
    font-weight: 900;
    font-size: 13px;
    color: #1e293b;
    line-height: 1;
  }

  .barcode-area span {
    font-size: 8px;
    font-family: monospace;
    color: #64748b;
  }

  .sign-area {
    text-align: center;
    width: 80px;
  }

  .sign-area .sign-line {
    border-top: 1px dashed #334155;
    margin-bottom: 2px;
  }

  .sign-area span {
    font-size: 9px;
    font-weight: 700;
    color: #047857;
  }

  /* Back Card */
  .staff-id-card.back-card {
    background: #fafaf9;
  }

  .staff-back-ribbon {
    background: #0f172a;
    color: #fde047;
    font-size: 11px;
    font-weight: 800;
    padding: 4px;
    text-align: center;
    border-bottom: 1.5px solid #fbbf24;
  }

  .staff-back-body {
    flex: 1;
    padding: 12px 16px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .staff-back-table {
    width: 100%;
    font-size: 11.5px;
    border-collapse: collapse;
  }

  .staff-back-table tr {
    border-bottom: 1px dashed #e2e8f0;
  }

  .staff-back-table tr:last-child {
    border-bottom: none;
  }

  .staff-back-table td {
    padding: 6px 3px;
  }

  .staff-back-table td.lbl {
    width: 95px;
    color: #475569;
    font-weight: 700;
  }

  .staff-back-table td.sep {
    width: 10px;
    text-align: center;
    font-weight: 700;
    color: #64748b;
  }

  .card-instruction-note {
    background: #f1f5f9;
    border-radius: 6px;
    padding: 8px;
    font-size: 10px;
    color: #475569;
    line-height: 1.4;
    text-align: center;
  }

  .staff-back-footer {
    background: linear-gradient(135deg, #064e3b 0%, #047857 70%, #059669 100%);
    color: #ffffff;
    padding: 8px 10px 7px;
    border-top: 2px solid #fbbf24;
    text-align: center;
  }

  .staff-back-footer .head-name {
    font-size: 12px;
    font-weight: 800;
  }

  .staff-back-footer .head-desig {
    font-size: 10.5px;
    color: #fef08a;
  }

  .staff-back-footer .inst-name {
    font-size: 11px;
    font-weight: 800;
    margin-top: 2px;
  }

  .staff-back-footer .inst-sub {
    font-size: 8.5px;
    color: #d1fae5;
  }

  .badge-active {
    background: #dcfce7;
    color: #166534;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
  }

  .highlight-code {
    color: #b91c1c;
    font-size: 13px;
  }

  .mono {
    font-family: monospace;
    font-size: 12px;
  }

  /* Office Copy Specific Styles */
  .office-copy-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-28deg);
    font-size: 50px;
    font-weight: 900;
    color: rgba(6, 78, 59, 0.08);
    text-transform: uppercase;
    letter-spacing: 4px;
    pointer-events: none;
    z-index: 10;
    white-space: nowrap;
    border: 4px dashed rgba(6, 78, 59, 0.15);
    padding: 10px 30px;
    border-radius: 12px;
  }

  .office-copy-top-banner {
    background: #f0fdf4;
    border: 1.5px dashed #047857;
    border-radius: 6px;
    padding: 8px 14px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Noto Sans Bengali', Arial, sans-serif;
  }

  .office-copy-bottom-meta {
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1.5px dashed #64748b;
    display: flex;
    justify-content: space-between;
    font-family: 'Noto Sans Bengali', Arial, sans-serif;
  }
`;
