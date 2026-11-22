import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{D as t,E as n,F as r,I as i,c as a,k as o,l as s,s as c}from"./panel-admission-BqCUuu-_.js";import"./data-mock-DXDqiaQ4.js";var l=e(r(),1),u=i(),d=a;function f(e,t){if(!e)return!1;if(!t||t===`all`||t===`সকল বিভাগ`)return!0;let n=String(t).toLowerCase().trim(),r=n.includes(`বিজ্ঞান`)||n.includes(`science`)||n.includes(`sci`),i=n.includes(`মানবিক`)||n.includes(`humanities`)||n.includes(`hum`)||n.includes(`arts`),a=n.includes(`ব্যবসা`)||n.includes(`ব্যবসায়`)||n.includes(`ব্যবসায়`)||n.includes(`বাণিজ্য`)||n.includes(`business`)||n.includes(`commerce`)||n.includes(`bs`),o=e.student||e,s=String(o.department||o.group_name||o.group||o.section||o.student_code||o.student_id||o.id||``).toLowerCase(),l=s.includes(`বিজ্ঞান`)||s.includes(`science`)||s.includes(`sci`)||o.student_id&&String(o.student_id).toLowerCase().includes(`sci`)||o.student_code&&String(o.student_code).toLowerCase().includes(`sci`),u=s.includes(`মানবিক`)||s.includes(`humanities`)||s.includes(`hum`)||s.includes(`arts`)||o.student_id&&String(o.student_id).toLowerCase().includes(`hum`)||o.student_code&&String(o.student_code).toLowerCase().includes(`hum`),d=s.includes(`ব্যবসা`)||s.includes(`ব্যবসায়`)||s.includes(`ব্যবসায়`)||s.includes(`বাণিজ্য`)||s.includes(`business`)||s.includes(`commerce`)||s.includes(`bs`)||o.student_id&&String(o.student_id).toLowerCase().includes(`bs`)||o.student_code&&String(o.student_code).toLowerCase().includes(`bs`);if(r)return!(!l||u||d);if(i)return!(!u||l||d);if(a)return!(!d||l||u);let f=c(o);return r?f===1:i?f===2:a?f===3:f===4}function p(e,t){if(!e||!t)return!1;let n=String(t.class_name||``),r=[`9`,`10`,`৯`,`১০`].includes(n),i=String(e.code||``),a=String(e.name_bn||``);if([`111`,`112`,`113`,`114`].includes(i)||a.includes(`ধর্ম`)){let e=(t.religion||`ইসলাম`).trim();return e.includes(`হিন্দু`)||e.toLowerCase().includes(`hindu`)?i===`112`||a.includes(`হিন্দু`):e.includes(`বৌদ্ধ`)||e.toLowerCase().includes(`buddhist`)?i===`113`||a.includes(`বৌদ্ধ`):e.includes(`খ্রিষ্টান`)||e.toLowerCase().includes(`christian`)?i===`114`||a.includes(`খ্রিষ্টান`):i===`111`||a.includes(`ইসলাম`)}if(!r)return!0;let o=(t.department||t.group_name||t.group||`বিজ্ঞান`).trim(),s=o.includes(`মানবিক`)||o.toLowerCase().includes(`humanities`)||o.includes(`আর্টস`),c=o.includes(`ব্যবসায়`)||o.toLowerCase().includes(`commerce`)||o.includes(`বাণিজ্য`);if(!s&&!c&&(i===`126`||i===`134`)){let e=(t.fourth_subject||t.fourth_subject_code||t.optional_subject||t.optional_subject_name||t.elective_subject||``).toString().toLowerCase();if(e){if(e.includes(`134`)||e.includes(`কৃষি`)||e.includes(`agri`))return i===`134`;if(e.includes(`126`)||e.includes(`উচ্চতর`)||e.includes(`গণিত`)||e.includes(`higher`)||e.includes(`math`))return i===`126`}}let l=(e.department||`আবশ্যিক`).trim();return l===`আবশ্যিক`||l===`সাধারণ`||l===`all`||!l||f(t,l)}var m=[`6`,`7`,`8`,`9`,`10`],h=[{name_bn:`১ম সাময়িক পরীক্ষা`,name_en:`1st Terminal Examination`,exam_type:`সাময়িক পরীক্ষা`},{name_bn:`অর্ধ-বার্ষিক পরীক্ষা`,name_en:`Half Yearly Examination`,exam_type:`সাময়িক পরীক্ষা`},{name_bn:`২য় সাময়িক পরীক্ষা`,name_en:`2nd Terminal Examination`,exam_type:`সাময়িক পরীক্ষা`},{name_bn:`প্রাক-নির্বাচনী পরীক্ষা`,name_en:`Pre-Test Examination`,exam_type:`নির্বাচনী পরীক্ষা`},{name_bn:`নির্বাচনী পরীক্ষা`,name_en:`Test Examination`,exam_type:`নির্বাচনী পরীক্ষা`},{name_bn:`বার্ষিক পরীক্ষা`,name_en:`Annual Examination`,exam_type:`চূড়ান্ত পরীক্ষা`},{name_bn:`মডেল টেস্ট / ক্লাস টেস্ট`,name_en:`Model Test / Class Assessment`,exam_type:`সাময়িক পরীক্ষা`}],g=[{year:`2026`,title_bn:`২০২৬ শিক্ষাবর্ষ`,is_current:!0,status:`active`,remarks:`চলমান প্রধান শিক্ষাবর্ষ`},{year:`2027`,title_bn:`২০২৭ শিক্ষাবর্ষ`,is_current:!1,status:`upcoming`,remarks:`আসন্ন শিক্ষাবর্ষ`},{year:`2025`,title_bn:`২০২৫ শিক্ষাবর্ষ`,is_current:!1,status:`completed`,remarks:`বিগত শিক্ষাবর্ষ`},{year:`2024`,title_bn:`২০২৪ শিক্ষাবর্ষ`,is_current:!1,status:`completed`,remarks:`আর্কাইভ শিক্ষাবর্ষ`}];function _({sub:e,userRole:r}){let i=(0,l.useMemo)(()=>{try{return JSON.parse(localStorage.getItem(`magra_user`)||`{}`)}catch{return{}}},[]),a=r||i?.role_name||i?.role||`super_admin`,_=a===`teacher`||a===`librarian`,v=e=>_?`marks`:!e||e===`academic_year`||e===`academic_years`?`academic_year`:e===`exam_names`||e===`exam_setup`||e===`setup`?`exam_names`:e===`subjects`?`subjects`:e===`marks`?`marks`:e===`grading`?`grading`:e===`processing`?`processing`:e===`merit`?`merit`:e===`failed_list`||e===`failed`?`failed_list`:e===`tabulation`?`tabulation`:e===`marksheet`||e===`progress`?`marksheet`:e===`analysis`?`analysis`:e===`promotion`||e===`promotions`||e===`ssc_form_fillup`?`promotion`:`academic_year`,[y,b]=(0,l.useState)(v(e));(0,l.useEffect)(()=>{e&&b(v(e))},[e]);let[x,S]=(0,l.useState)([]),[C,ee]=(0,l.useState)([]),[te,w]=(0,l.useState)([]),[ne,T]=(0,l.useState)([]),[E,D]=(0,l.useState)(``),[re,ie]=(0,l.useState)(`info`),[O,k]=(0,l.useState)(`2026`),[A,j]=(0,l.useState)(``),[M,ae]=(0,l.useState)(`6`),[N,P]=(0,l.useState)(`all`),[oe,F]=(0,l.useState)(``),[I,L]=(0,l.useState)([]),[R,se]=(0,l.useState)([]),[ce,z]=(0,l.useState)([]),[B,le]=(0,l.useState)(0),[V,ue]=(0,l.useState)(null),[de,fe]=(0,l.useState)(!1),[H,pe]=(0,l.useState)(`all`),[me,he]=(0,l.useState)(``),[ge,_e]=(0,l.useState)(``),[ve,ye]=(0,l.useState)(`all`),[U,be]=(0,l.useState)(`auto`),[xe,Se]=(0,l.useState)(null),[Ce,we]=(0,l.useState)({year:`2026`,title_bn:`২০২৬ শিক্ষাবর্ষ`,is_current:!0,status:`active`,remarks:`চলমান শিক্ষাবর্ষ`}),[Te,Ee]=(0,l.useState)(null),[De,Oe]=(0,l.useState)(`all`),[ke,W]=(0,l.useState)({academic_year:`2026`,name_bn:``,name_en:``,exam_type:`সাময়িক পরীক্ষা`,status:`active`,remarks:``}),[Ae,je]=(0,l.useState)(null),[Me,Ne]=(0,l.useState)({code:``,name_bn:``,name_en:``,class_name:`6`,department:`সাধারণ`,full_marks:100,written_max:70,written_pass:23,mcq_max:30,mcq_pass:10,practical_max:0,practical_pass:0,pass_marks:33,is_optional:!1}),G=(e,t=`success`)=>{D(e),ie(t),setTimeout(()=>D(``),4500)},Pe=async()=>{try{let e=await d(`/academic-years`);if(Array.isArray(e)&&e.length){S(e);let t=e.find(e=>e.is_current)||e[0];t&&(k(String(t.year)),W(e=>({...e,academic_year:String(t.year)})))}let t=await d(`/exams`);if(Array.isArray(t)){let e=t.filter(Boolean);ee(e);let n=null;try{let t=localStorage.getItem(`magra_selected_exam_type`);t===`half_yearly`?n=e.find(e=>e.name_bn&&e.name_bn.includes(`অর্ধ`)||e.exam_type&&e.exam_type.includes(`অর্ধ`)):t===`annual`?n=e.find(e=>e.name_bn&&e.name_bn.includes(`বার্ষিক`)||e.exam_type&&e.exam_type.includes(`বার্ষিক`)):t===`pre_test`?n=e.find(e=>e.name_bn&&e.name_bn.includes(`প্রাক`)||e.exam_type&&e.exam_type.includes(`প্রাক`)):t===`test`&&(n=e.find(e=>e.name_bn&&!e.name_bn.includes(`প্রাক`)&&e.name_bn.includes(`নির্বাচন`)||e.name_en&&e.name_en.toLowerCase().includes(`test`))),n&&localStorage.removeItem(`magra_selected_exam_type`)}catch{}n?j(n.id):e.length&&!A?j(e[0].id):e.length||j(``)}let n=await d(`/subjects`);Array.isArray(n)&&w(n)}catch(e){console.warn(`Load master data warning:`,e)}};(0,l.useEffect)(()=>{Pe()},[]);let K=[`9`,`10`,`৯`,`১০`].includes(String(M)),Fe=(0,l.useMemo)(()=>x.find(e=>e.is_current)||x[0]||null,[x]),Ie=(0,l.useMemo)(()=>{let e=C.filter(Boolean);return De===`all`?e:e.filter(e=>String(e.academic_year)===String(De))},[C,De]),Le=(0,l.useMemo)(()=>{let e=C.filter(Boolean);return!O||O===`all`?e:e.filter(e=>String(e.academic_year)===String(O))},[C,O]);(0,l.useEffect)(()=>{Le.length>0?Le.find(e=>String(e.id)===String(A))||j(Le[0].id):j(``)},[O,Le]),(0,l.useEffect)(()=>{if(A){let e=C.find(e=>String(e.id)===String(A)),t=(e?.name_bn||``).toLowerCase(),n=(e?.remarks||``).toLowerCase(),r=String(A).toLowerCase();(r.includes(`test`)||r.includes(`pre-test`)||t.includes(`নির্বাচন`)||n.includes(`১০ম`)||n.includes(`ssc`))&&M!==`10`&&ae(`10`)}},[A]);let q=(0,l.useMemo)(()=>C.find(e=>String(e.id)===String(A)),[C,A]),Re=(0,l.useMemo)(()=>{let e=(q?.name_bn||``).trim(),t=(q?.exam_type||``).trim().toLowerCase();return e.includes(`অর্ধ`)||e.includes(`প্রাক`)||e.includes(`সাময়িক`)||e.includes(`সাময়িক`)||e.includes(`টিউটোরিয়াল`)||e.includes(`টিউটোরিয়াল`)||e.includes(`মাসিক`)||t.includes(`half`)||t.includes(`mid`)||t.includes(`pre`)},[q]),J=(0,l.useMemo)(()=>{if(Re)return!1;let e=(q?.name_bn||``).trim(),t=(q?.exam_type||``).trim().toLowerCase();return e.includes(`বার্ষিক`)||e.includes(`নির্বাচন`)||e.includes(`টেস্ট`)||e.includes(`test`)||e.includes(`মডেল`)||e.includes(`সমাপনী`)||t.includes(`annual`)||t.includes(`final`)||!0},[Re,q]),ze=(0,l.useMemo)(()=>U===`both`?!0:U===`preparer`||U===`guardian`?!1:Re,[U,Re]),Be=(0,l.useMemo)(()=>U===`guardian`?`অভিভাবকের স্বাক্ষর`:`প্রস্তুতকারীর স্বাক্ষর`,[U]),Ve=(0,l.useMemo)(()=>ze?`..............................`:`...........................................`,[ze]),He=(0,l.useMemo)(()=>{let e=q?q.name_bn:J?`নির্বাচনী পরীক্ষা`:`অর্ধ-বার্ষিক পরীক্ষা`;return J?`একাডেমিক ট্রান্সক্রিপ্ট / মার্কশিট (ACADEMIC TRANSCRIPT) — ${e} ${o(O)}`:`শিক্ষার্থীর প্রোগ্রেস রিপোর্ট (STUDENT PROGRESS REPORT) — ${e} ${o(O)}`},[q,J,O]),Ue=(0,l.useMemo)(()=>J?`একাডেমিক ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,[J]),Y=(0,l.useMemo)(()=>te.filter(e=>e.class_name&&String(e.class_name)!==String(M)?!1:K?String(e.code)===`151`||N&&(N.includes(`মানবিক`)||N.includes(`humanities`))&&String(e.code)===`140`?!1:N===`all`||N===`সকল বিভাগ`||e.department===`আবশ্যিক`||f({department:e.department},N):!0),[te,M,N,K]),We=(0,l.useMemo)(()=>{let e=[],t=new Set,n=Y.some(e=>String(e.code)===`111`),r=Y.some(e=>String(e.code)===`112`),i=n||r,a=Y.some(e=>String(e.code)===`126`),o=Y.some(e=>String(e.code)===`134`),s=a&&o;return Y.forEach(n=>{let r=String(n.code);if(!t.has(r)){if([`111`,`112`,`113`,`114`].includes(r)&&i){t.has(`rel_merged`)||(t.add(`rel_merged`),t.add(`111`),t.add(`112`),t.add(`113`),t.add(`114`),e.push({isMerged:!0,type:`religion`,code:`111/112`,codes:[`111`,`112`,`113`,`114`],name_bn:`ইসলাম ধর্ম / হিন্দু ধর্ম`,headerTitle:`[111/112] ইসলাম ধর্ম / হিন্দু ধর্ম`,written_max:n.written_max||70,mcq_max:n.mcq_max||30,practical_max:n.practical_max||0,full_marks:100}));return}if((r===`126`||r===`134`)&&s){t.has(`fourth_merged`)||(t.add(`fourth_merged`),t.add(`126`),t.add(`134`),e.push({isMerged:!0,type:`fourth_subject`,code:`126/134`,codes:[`126`,`134`],name_bn:`উচ্চতর গণিত / কৃষি শিক্ষা`,headerTitle:`[126/134] উচ্চতর গণিত / কৃষি শিক্ষা`,written_max:50,mcq_max:25,practical_max:25,full_marks:100}));return}t.add(r),e.push({isMerged:!1,id:n.id,code:n.code,codes:[r],name_bn:n.name_bn,headerTitle:`[${n.code}] ${n.name_bn}`,written_max:n.written_max,mcq_max:n.mcq_max,practical_max:n.practical_max,full_marks:n.full_marks})}}),e},[Y]),Ge=(e,t)=>{if(!e||!e.subjects||!e.subjects.length)return null;if(t.isMerged){for(let n of t.codes){let t=e.subjects.find(e=>String(e.code)===String(n));if(t)return t}if(t.type===`religion`){let t=e.subjects.find(e=>[`111`,`112`,`113`,`114`].includes(String(e.code))||String(e.name_bn||``).includes(`ধর্ম`)||String(e.name_bn||``).includes(`ইসলাম`)||String(e.name_bn||``).includes(`হিন্দু`));if(t)return t}if(t.type===`fourth_subject`){let t=e.subjects.find(e=>[`126`,`134`].includes(String(e.code))||String(e.name_bn||``).includes(`উচ্চতর`)||String(e.name_bn||``).includes(`গণিত`)||String(e.name_bn||``).includes(`কৃষি`));if(t)return t}return null}return e.subjects.find(e=>String(e.code)===String(t.code)||t.id&&String(e.subject_id)===String(t.id))||null};(0,l.useEffect)(()=>{if(Y.length>0){if(!Y.find(e=>String(e.id)===String(oe))){let e=String(i?.subject||``).trim().toLowerCase(),t=null;if(e&&_){let n=e=>String(e||``).toLowerCase().replace(/ী/g,`ি`).replace(/ূ/g,`ু`).replace(/ণ/g,`ন`).trim(),r=n(e);t=Y.find(e=>{let t=String(e.name_bn||``).toLowerCase(),i=n(t),a=String(e.name_en||``).toLowerCase();return!!(i.includes(r)||r.includes(i)||a&&r.includes(a)||(r.includes(`ইংরে`)||r.includes(`english`))&&(i.includes(`ইংরে`)||a.includes(`english`))||(r.includes(`ভৌত`)||r.includes(`বিজ্ঞান`)||r.includes(`পদার্থ`)||r.includes(`রসায়ন`))&&(i.includes(`বিজ্ঞান`)||i.includes(`পদার্থ`)||i.includes(`রসায়ন`))||(r.includes(`ব্যবসায়`)||r.includes(`হিসাব`))&&(i.includes(`ব্যবসায়`)||i.includes(`হিসাব`)||i.includes(`উদ্যোগ`)))})}F(t?t.id:Y[0].id)}}else F(``)},[Y,i,_]);let X=(0,l.useMemo)(()=>te.find(e=>String(e.id)===String(oe))||Y[0]||null,[te,oe,Y]),Ke=async()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}if(!X){G(`অনুগ্রহ করে বিষয় নির্বাচন করুন`,`error`);return}try{let e=`/students?class_name=`+M;K&&N&&N!==`all`&&N!==`সকল বিভাগ`&&(e+=`&department=`+encodeURIComponent(N));let t=await d(e),n=(Array.isArray(t)?t:[]).filter(e=>!(!p(X,e)||K&&N&&N!==`all`&&N!==`সকল বিভাগ`&&!f(e,N))),r=s(n);L(r);let i=await d(`/marks?exam_id=`+A+`&class_name=`+M),a=new Map;(Array.isArray(i)?i:[]).forEach(e=>{a.set(`${e.student_id}_${e.subject_id}`,e),a.set(`${e.student_id}_${e.subject_code}`,e),e.student_code&&(a.set(`${e.student_code}_${e.subject_id}`,e),a.set(`${e.student_code}_${e.subject_code}`,e))});let c=r.map(e=>{let t=`${e.id}_${X.id}`,n=`${e.student_id}_${X.id}`,r=`${e.id}_${X.code}`,i=`${e.student_id}_${X.code}`,o=a.get(t)||a.get(n)||a.get(r)||a.get(i)||{};return{student_id:e.id,student_code:e.student_id||e.id||`STU-`+e.roll_no,roll_no:e.roll_no!==void 0&&e.roll_no!==null?e.roll_no:``,name_bn:e.name_bn||e.name_en||``,department:e.department||e.group_name||e.group||`সাধারণ`,subject_id:X.id,subject_code:X.code,written:o.written!==null&&o.written!==void 0?o.written:``,mcq:o.mcq!==null&&o.mcq!==void 0?o.mcq:``,practical:o.practical!==null&&o.practical!==void 0?o.practical:``,absent:!!o.absent,remarks:o.remarks||``}});se(c);let l=K&&N&&N!==`all`&&N!==`সকল বিভাগ`?` (${N} বিভাগ)`:``;G(`শ্রেণি ${o(M)}${l} এর ${o(c.length)} জন শিক্ষার্থীর নম্বর এন্ট্রি ঘর প্রস্তুত হয়েছে।`,`success`)}catch(e){G(`শিক্ষার্থী তালিকা লোড ব্যর্থ: `+e.message,`error`)}};(0,l.useEffect)(()=>{y===`marks`&&A&&X&&Ke()},[y,A,M,oe,N]);let qe=(0,l.useMemo)(()=>!K||!N||N===`all`||N===`সকল বিভাগ`?R:R.filter(e=>f(e,N)),[R,K,N]),Je=e=>{if(e==null)return``;let t=String(e);t=t.replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e)),t=t.replace(/[^0-9.]/g,``);let n=t.split(`.`);return n.length>2&&(t=n[0]+`.`+n.slice(1).join(``)),t},Ye=(e,t,n,r)=>{let i=n;if([`written`,`mcq`,`practical`].includes(t)&&(i=Je(n),i!==``&&r!=null&&r>0)){let e=parseFloat(i);!isNaN(e)&&e>r&&(i=String(r))}se(n=>n.map((n,r)=>typeof e==`number`&&r===e||e&&(n.student_id===e||n.student_code===e)?{...n,[t]:i}:n))},Xe=(e,t,n)=>{if(e.key===`Enter`||e.key===`ArrowDown`){e.preventDefault();let r=document.getElementById(`roster-mark-${n}-${t+1}`);r&&(r.focus(),r.select())}else if(e.key===`ArrowUp`){e.preventDefault();let r=document.getElementById(`roster-mark-${n}-${t-1}`);r&&(r.focus(),r.select())}},Ze=async()=>{if(!A){G(`পরীক্ষা নির্বাচন করুন`,`error`);return}let e=qe.length?qe:R;if(!e.length){G(`সংরক্ষণ করার মতো কোনো শিক্ষার্থীর নম্বর নেই`,`error`);return}try{let t=e.map(e=>({exam_id:A,class_name:M,student_id:e.student_id,student_code:e.student_code||e.student_id,roll_no:e.roll_no,department:e.department||N,subject_id:X?.id||e.subject_id,subject_code:X?.code||e.subject_code,written:e.written,mcq:e.mcq,practical:e.practical,absent:e.absent,remarks:e.remarks}));await d(`/marks/bulk`,{method:`POST`,body:JSON.stringify({exam_id:A,records:t})}),await d(`/results/process`,{method:`POST`,body:JSON.stringify({exam_id:A,class_name:M})}),lt(!0);let n=K&&N&&N!==`all`&&N!==`সকল বিভাগ`?` (${N} বিভাগ)`:``;G(`${X?.name_bn||`নির্বাচিত`} বিষয়ের${n} ${o(t.length)} জন শিক্ষার্থীর নম্বর সফলভাবে সংরক্ষিত ও প্রসেস হয়েছে! ✓`,`success`)}catch(e){G(`নম্বর সংরক্ষণ ব্যর্থ: `+e.message,`error`)}},Qe=()=>{if(!X)return;let e=X.written_max||0,t=X.mcq_max||0,n=X.practical_max||0,r=qe.length?qe:R,i=new Set(r.map(e=>e.student_id||e.student_code));se(r=>r.map((r,a)=>{if(i.size>0&&!i.has(r.student_id||r.student_code))return r;let o=a%7==6?.3:a%5==0?.92:a%3==0?.82:.68,s=e?Math.round(e*o):0,c=t?Math.round(t*o):0,l=n?Math.round(n*(o>.5?.95:.7)):0;return{...r,written:s,mcq:c,practical:l,absent:!1}})),G(`নমুনা নম্বর সফলভাবে পূরণ করা হয়েছে। সংরক্ষণ করতে "💾 সব নম্বর সংরক্ষণ" বাটনে চাপুন।`,`info`)},$e=e=>{let t=[],n=[],r=``,i=!1;for(let a=0;a<e.length;a++){let o=e[a],s=e[a+1];o===`"`?i&&s===`"`?(r+=`"`,a++):i=!i:o===`,`&&!i?(n.push(r),r=``):(o===`
`||o===`\r`)&&!i?(o===`\r`&&s===`
`&&a++,n.push(r),n.some(e=>e.trim()!==``)&&t.push(n),n=[],r=``):r+=o}return(r!==``||n.length)&&(n.push(r),n.some(e=>e.trim()!==``)&&t.push(n)),t},et=()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}if(!X){G(`অনুগ্রহ করে বিষয় নির্বাচন করুন`,`error`);return}if(!R.length){G(`ডাউনলোড করার মতো কোনো শিক্ষার্থী পাওয়া যায়নি। তালিকা রিফ্রেশ করুন।`,`error`);return}let e=e=>{let t=e==null?``:String(e);return t.includes(`,`)||t.includes(`"`)||t.includes(`
`)||t.includes(`\r`)?`"${t.replace(/"/g,`""`)}"`:t},t=X.written_max||0,n=X.mcq_max||0,r=X.practical_max||0,i=[`Roll`,`Student_ID`,`Student_Name`,`Department`,`Exam_Name`,`Subject_Code`,`Subject_Name`,`Written_CQ_max_${t}`,`MCQ_max_${n}`,`Practical_max_${r}`,`Absent`,`Remarks`],a=(qe.length?qe:R).map(t=>[e(t.roll_no!==void 0&&t.roll_no!==null?t.roll_no:``),e(t.student_code||t.student_id||``),e(t.name_bn||``),e(t.department||`সাধারণ`),e(q?q.name_bn:``),e(X.code||``),e(X.name_bn||``),e(t.written!==null&&t.written!==void 0?t.written:``),e(t.mcq!==null&&t.mcq!==void 0?t.mcq:``),e(t.practical!==null&&t.practical!==void 0?t.practical:``),e(t.absent?`Yes`:`No`),e(t.remarks||``)]),s=`﻿`+[i.join(`,`),...a.map(e=>e.join(`,`))].join(`\r
`),c=new Blob([s],{type:`text/csv;charset=utf-8;`}),l=URL.createObjectURL(c),u=document.createElement(`a`),d=N&&N!==`all`&&N!==`সকল বিভাগ`?`_${N}`:``,f=(X.name_bn||`Subject`).replace(/[^\w\u0980-\u09FF]/g,`_`),p=(q?.name_bn||`Exam`).replace(/[^\w\u0980-\u09FF]/g,`_`);u.href=l,u.download=`Marks_Class_${M}${d}_${f}_Code${X.code}_${p}_${O}.csv`,document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(l),G(`শ্রেণি ${o(M)} এর "${X.name_bn}" বিষয়ের মার্কস এন্ট্রি CSV সফলভাবে ডাউনলোড হয়েছে! ✓`,`success`)},tt=()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}if(!We.length){G(`কোনো বিষয় পাওয়া যায়নি।`,`error`);return}let e=e=>{let t=e==null?``:String(e);return t.includes(`,`)||t.includes(`"`)||t.includes(`
`)||t.includes(`\r`)?`"${t.replace(/"/g,`""`)}"`:t},t=[`Roll`,`Student_Name`];We.forEach(e=>{e.written_max>0&&t.push(`${e.headerTitle} (CQ max ${e.written_max})`),e.mcq_max>0&&t.push(`${e.headerTitle} (MCQ max ${e.mcq_max})`),e.practical_max>0&&t.push(`${e.headerTitle} (Prac max ${e.practical_max})`),t.push(`${e.headerTitle} (Total)`),t.push(`${e.headerTitle} (Grade)`)}),t.push(`Total_Marks`,`GPA`,`Grade`,`Result`);let n=[...Z.length?Z:I].sort((e,t)=>{let n=Number(e.roll_no)||0,r=Number(t.roll_no)||0;return n===r?(e.student_id||``).localeCompare(t.student_id||``):n-r}).map(t=>{let n=[e(t.roll_no===void 0?``:t.roll_no),e(t.name_bn||t.name_en||``)];return We.forEach(r=>{let i=Ge(t,r);r.written_max>0&&n.push(e(i?.written!==void 0&&i?.written!==null?i.written:``)),r.mcq_max>0&&n.push(e(i?.mcq!==void 0&&i?.mcq!==null?i.mcq:``)),r.practical_max>0&&n.push(e(i?.practical!==void 0&&i?.practical!==null?i.practical:``)),n.push(e(i?.total!==void 0&&i?.total!==null?i.total:``)),n.push(e(i?.letter_grade||``))}),n.push(e(t.total_marks===void 0?``:t.total_marks),e(t.gpa===void 0?``:t.gpa),e(t.final_grade||``),e(t.result_status||(t.is_pass?`উত্তীর্ণ`:`অনুত্তীর্ণ`))),n}),r=`﻿`+[t.join(`,`),...n.map(e=>e.join(`,`))].join(`\r
`),i=new Blob([r],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),s=document.createElement(`a`),c=(q?.name_bn||`Exam`).replace(/[^\w\u0980-\u09FF]/g,`_`);s.href=a,s.download=`Master_Tabulation_Class_${M}_${c}_${O}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a),G(`শ্রেণি ${o(M)} এর মাস্টার ট্যাবুলেশন শিট CSV সফলভাবে ডাউনলোড হয়েছে! ✓`,`success`)},nt=()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}if(!Z.length){G(`ট্যাবুলেশন শিটে প্রদর্শনের মতো কোনো শিক্ষার্থীর ফলাফল নেই`,`error`);return}let e=window.open(``,`_blank`);if(!e){alert(`পপ-আপ উইন্ডো ব্লক করা হয়েছে। দয়া করে ব্রাউজারের পপ-আপ অনুমোদন করুন।`),window.print();return}let t=q?q.name_bn:`পরীক্ষা`,n=K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} বিভাগ`:`সকল বিভাগ/শাখা`,r=Z.length,i=Z.filter(e=>e.is_pass).length,a=r-i,s=Z.filter(e=>Number(e.gpa)>=5&&e.is_pass).length,c=r?(i/r*100).toFixed(1):`0`,l=We.map(e=>`
      <th colspan="4" class="sub-head-cell">
        ${e.headerTitle}
      </th>
    `).join(``),u=We.map(()=>`
      <th class="col-sub">CQ</th>
      <th class="col-sub">MCQ</th>
      <th class="col-sub">Prac</th>
      <th class="col-sub">মোট</th>
    `).join(``),d=[...Z].sort((e,t)=>{let n=Number(e.roll_no)||0,r=Number(t.roll_no)||0;return n===r?(e.student_id||``).localeCompare(t.student_id||``):n-r}).map(e=>{let t=e.is_pass,n=o(e.roll_no),r=e.name_bn||`—`,i=We.map(t=>{let n=Ge(e,t);if(!n)return`
            <td class="cell-muted">—</td>
            <td class="cell-muted">—</td>
            <td class="cell-muted">—</td>
            <td class="cell-muted">—</td>
          `;let r=n.written_max>0&&n.written!==null&&n.written!==void 0?n.written:`—`,i=n.mcq_max>0&&n.mcq!==null&&n.mcq!==void 0?n.mcq:`—`,a=n.practical_max>0&&n.practical!==null&&n.practical!==void 0?n.practical:`—`,o=n.total!==null&&n.total!==void 0?n.total:`—`,s=n.letter_grade||`F`,c=n.is_pass?`cell-pass`:`cell-fail`,l=``;return t.isMerged&&(String(n.code)===`111`?l=`<br><span style="font-size:7px;color:#047857;font-weight:600;">ইসলাম</span>`:String(n.code)===`112`?l=`<br><span style="font-size:7px;color:#b45309;font-weight:600;">হিন্দু</span>`:String(n.code)===`126`?l=`<br><span style="font-size:7px;color:#1d4ed8;font-weight:600;">উ: গণিত</span>`:String(n.code)===`134`&&(l=`<br><span style="font-size:7px;color:#15803d;font-weight:600;">কৃষি</span>`)),`
          <td>${r}</td>
          <td>${i}</td>
          <td>${a}</td>
          <td class="${c}"><b>${o}</b><br><small style="font-size:7.5px;">${s}</small>${l}</td>
        `}).join(``),a=e.total_marks===void 0?`—`:e.total_marks,s=e.gpa===void 0?`0.00`:e.gpa,c=e.final_grade||`F`;return`
        <tr>
          <td><b>${n}</b></td>
          <td style="text-align:left;white-space:nowrap;padding-left:4px;"><b>${r}</b></td>
          ${i}
          <td><b>${a}</b></td>
          <td style="font-weight:700;color:${t?`#065f46`:`#dc2626`};">${s}</td>
          <td><b>${c}</b></td>
          <td><span class="${t?`badge-pass`:`badge-fail`}">${t?`উত্তীর্ণ`:`অনুত্তীর্ণ`}</span></td>
        </tr>
      `}).join(``),f=`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>ট্যাবুলেশন_শিট_${M}_${n}_${O}.pdf</title>
  <style>
    @page {
      size: legal landscape;
      margin: 5mm 6mm 6mm 6mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'SolaimanLipi', Arial, 'Noto Sans Bengali', sans-serif;
      margin: 0;
      padding: 4px;
      color: #0f172a;
      background: #ffffff;
      font-size: 8.5px;
      line-height: 1.15;
    }
    .no-print-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #064e3b;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .btn-action {
      background: #ffffff;
      color: #064e3b;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-action:hover { background: #e2e8f0; }
    @media print {
      .no-print-bar { display: none !important; }
      body { margin: 0; padding: 0; }
    }

    /* Header */
    .sheet-header {
      text-align: center;
      border-bottom: 2px solid #064e3b;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }
    .school-title {
      font-size: 18px;
      font-weight: 900;
      color: #064e3b;
      margin: 0 0 2px 0;
      letter-spacing: 0.5px;
    }
    .school-address {
      font-size: 10px;
      color: #334155;
      margin: 0 0 3px 0;
    }
    .sheet-title-badge {
      display: inline-block;
      background: #f1f5f9;
      border: 1.5px solid #065f46;
      color: #064e3b;
      padding: 2px 14px;
      border-radius: 4px;
      font-size: 12.5px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .meta-line {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      font-weight: 700;
      color: #1e293b;
      padding: 2px 4px;
    }

    /* Table Matrix */
    table.tab-matrix {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
      margin-top: 4px;
    }
    table.tab-matrix th, table.tab-matrix td {
      border: 1px solid #334155;
      padding: 2px 1px;
      text-align: center;
      font-size: 8px;
    }
    table.tab-matrix th {
      background: #e2e8f0;
      color: #0f172a;
      font-weight: 700;
    }
    .sub-head-cell {
      background: #cbd5e1 !important;
      font-size: 8.5px;
      padding: 3px 1px;
    }
    .col-sub {
      width: 20px;
      font-size: 7.5px;
    }
    .cell-pass {
      color: #065f46;
      font-weight: 700;
      background: #f0fdf4;
    }
    .cell-fail {
      color: #b91c1c;
      font-weight: 800;
      background: #fee2e2 !important;
    }
    .cell-muted {
      color: #94a3b8;
    }
    .badge-pass {
      display: inline-block;
      padding: 1px 3px;
      background: #dcfce7;
      color: #15803d;
      border-radius: 2px;
      font-weight: 700;
      font-size: 7.5px;
    }
    .badge-fail {
      display: inline-block;
      padding: 1px 3px;
      background: #fee2e2;
      color: #b91c1c;
      border-radius: 2px;
      font-weight: 700;
      font-size: 7.5px;
    }

    /* Signatures */
    .signatures-grid {
      margin-top: 32px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 25px;
      text-align: center;
      font-size: 9px;
      page-break-inside: avoid;
    }
    .signature-item {
      border-top: 1px dashed #334155;
      padding-top: 4px;
      font-weight: 700;
      color: #0f172a;
    }
    .sheet-footer-line {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 7.5px;
      color: #64748b;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <b>📄 মাস্টার ট্যাবুলেশন শিট — Legal Landscape প্রিন্ট ও PDF প্রিভিউ</b>
      <span style="font-size:11px;opacity:0.9;margin-left:10px;">(📌 PDF হিসেবে সংরক্ষণ করতে Destination-এ <b>"Save as PDF"</b> এবং Paper Size: <b>Legal Landscape</b> নির্বাচন করুন)</span>
    </div>
    <div style="display:flex;gap:8px;">
      <button type="button" class="btn-action" style="background:#0284c7;color:#fff;" onclick="window.print()">📥 PDF ডাউনলোড / সেভ করুন</button>
      <button type="button" class="btn-action" style="background:#059669;color:#fff;" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
      <button type="button" class="btn-action" onclick="window.close()" style="background:#e2e8f0;color:#0f172a;">✕ বন্ধ করুন</button>
    </div>
  </div>

  <div class="sheet-header">
    <div class="school-title">মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়</div>
    <div class="school-sub">ডাকঘর: মগড়া, উপজেলা: কালিহাতী, জেলা: টাঙ্গাইল • স্থাপিত: ১৯৪৬ • EIIN: 114290</div>
    <div class="sheet-title-badge">মাস্টার ট্যাবুলেশন শিট — ${t}</div>
    <div class="meta-line">
      <span><b>শিক্ষাবর্ষ:</b> ${o(O)}</span>
      <span><b>শ্রেণি:</b> শ্রেণি ${o(M)}</span>
      <span><b>বিভাগ/শাখা:</b> ${n}</span>
      <span><b>মোট পরীক্ষার্থী:</b> ${o(r)} জন</span>
      <span><b>উত্তীর্ণ:</b> <span style="color:#059669">${o(i)} জন (${o(c)}%)</span></span>
      <span><b>অনুত্তীর্ণ:</b> <span style="color:#dc2626">${o(a)} জন</span></span>
      <span><b>GPA-5:</b> <span style="color:#d97706">${o(s)} জন</span></span>
    </div>
  </div>

  <table class="tab-matrix">
    <thead>
      <tr>
        <th rowspan="2" style="width:36px;">রোল</th>
        <th rowspan="2" style="width:145px;text-align:left;padding-left:6px;">শিক্ষার্থীর নাম</th>
        ${l}
        <th rowspan="2" style="width:38px;">সর্বমোট</th>
        <th rowspan="2" style="width:32px;">GPA</th>
        <th rowspan="2" style="width:28px;">গ্রেড</th>
        <th rowspan="2" style="width:40px;">ফলাফল</th>
      </tr>
      <tr>
        ${u}
      </tr>
    </thead>
    <tbody>
      ${d}
    </tbody>
  </table>

  <div class="signatures-grid">
    <div>
      <br><br>
      <div class="signature-item">প্রস্তুতকারীর স্বাক্ষর</div>
    </div>
    <div>
      <br><br>
      <div class="signature-item">যাচাইকারীর স্বাক্ষর</div>
    </div>
    <div>
      <br><br>
      <div class="signature-item">শ্রেণি শিক্ষকের স্বাক্ষর</div>
    </div>
    <div>
      <br><br>
      <div class="signature-item">প্রধান শিক্ষকের স্বাক্ষর ও সীল</div>
    </div>
  </div>

  <div class="sheet-footer-line">
    <span>সফটওয়্যার প্রস্তুতকারক: মগড়া পালস ইউনিয়ন উচ্চ বিদ্যালয় ডিজিটাল ম্যানেজমেন্ট সিস্টেম • প্রিন্টের তারিখ ও সময়: ${new Date().toLocaleDateString(`bn-BD`,{year:`numeric`,month:`long`,day:`numeric`,hour:`2-digit`,minute:`2-digit`})}</span>
    <span>পৃষ্ঠা সাইজ: Legal (8.5 × 14 ইঞ্চি) Landscape</span>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    };
  <\/script>
</body>
</html>`;e.document.write(f),e.document.close()},rt=()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}if(!Q.length){G(`নির্বাচিত বিভাগ/শ্রেণিতে কোনো অকৃতকার্য শিক্ষার্থী নেই`,`info`);return}let e=window.open(``,`_blank`);if(!e){alert(`পপ-আপ উইন্ডো ব্লক করা হয়েছে। দয়া করে ব্রাউজারের পপ-আপ অনুমোদন করুন।`),window.print();return}let t=q?q.name_bn:`পরীক্ষা`,n=K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} বিভাগ`:`সকল বিভাগ/শাখা`,r=Z.length,i=Q.length,a=r?(i/r*100).toFixed(1):`0`,s=Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||1)===1).length,c=Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||0)===2).length,l=Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||0)>=3).length,u=Q.map((e,t)=>{let n=o(t+1),r=o(e.roll_no),i=e.name_bn||`—`,a=e.student_id||`—`,s=e.department||`সাধারণ`,c=e.student?.guardian_phone||e.student?.phone||e.guardian_phone||`—`,l=e.total_marks===void 0?`—`:e.total_marks,u=e.gpa===void 0?`0.00`:e.gpa,d=pt(e);return`
        <tr>
          <td style="text-align:center;">${n}</td>
          <td style="text-align:center;"><b>${r}</b></td>
          <td style="text-align:center;font-size:10px;">${a}</td>
          <td style="text-align:left;padding-left:6px;"><b>${i}</b></td>
          <td style="text-align:center;">${s}</td>
          <td style="text-align:center;"><span class="badge-fail-count">${o(d.length||e.failed_count||1)}টি</span></td>
          <td style="text-align:left;padding-left:6px;font-size:10px;line-height:1.4;">${d.length?d.map(e=>`<b>${e.name}</b>`+(e.total===``?``:` (প্রাপ্ত: ${e.total})`)+(e.reason?` <small>[${e.reason}]</small>`:``)).join(`<br>`):e.failed_subjects&&e.failed_subjects.length?e.failed_subjects.join(`, `):`সকল বিষয়`}</td>
          <td style="text-align:center;"><b>${l}</b></td>
          <td style="text-align:center;color:#dc2626;font-weight:700;">${u}</td>
          <td style="text-align:center;font-size:10.5px;">${c}</td>
          <td style="min-width:65px;">&nbsp;</td>
        </tr>
      `}).join(``),d=`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>অকৃতকার্য_তালিকা_${M}_${n}_${O}.pdf</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: 'SolaimanLipi', 'Kalpurush', 'Nikosh', 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      color: #0f172a;
      background: #fff;
      font-size: 11px;
    }
    .print-container {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    .transcript-official-header {
      text-align: center;
      margin-bottom: 6px;
    }
    .transcript-school-name {
      font-size: 24px;
      font-weight: 900;
      color: #0b8050;
      margin: 0 0 2px 0;
      letter-spacing: 0.5px;
      line-height: 1.15;
    }
    .transcript-school-line {
      font-size: 12px;
      color: #334155;
      font-weight: 600;
      line-height: 1.35;
      margin: 0;
    }
    .transcript-school-eiin {
      font-size: 11.5px;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
    }
    .marksheet-exam-title-badge {
      text-align: center;
      margin: 6px 0 10px 0;
    }
    .marksheet-exam-title-badge span {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 4px 22px;
      border-radius: 9999px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 0.4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 11px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .stats-bar {
      display: flex;
      justify-content: space-around;
      background: #fff1f2;
      border: 1px dashed #f43f5e;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10.5px;
      margin-bottom: 10px;
      color: #9f1239;
      font-weight: 600;
    }
    .failed-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      margin-bottom: 20px;
    }
    .failed-table th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      border: 1px solid #64748b;
      padding: 5px 4px;
      text-align: center;
    }
    .failed-table td {
      border: 1px solid #94a3b8;
      padding: 4px 4px;
      vertical-align: middle;
    }
    .badge-fail-count {
      display: inline-block;
      background: #dc2626;
      color: #fff;
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .signatures-grid {
      display: flex;
      justify-content: space-between;
      margin-top: 35px;
      padding: 0 10px;
      page-break-inside: avoid;
    }
    .sig-col {
      text-align: center;
      width: 23%;
    }
    .sig-dots {
      border-top: 1px dashed #64748b;
      margin-bottom: 4px;
    }
    .sig-title {
      font-size: 11px;
      font-weight: 600;
      color: #334155;
    }
    .no-print-bar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #0f172a;
      color: #fff;
      padding: 8px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      margin-bottom: 12px;
    }
    .no-print-bar .btn-action {
      border: none;
      padding: 6px 14px;
      border-radius: 5px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12px;
    }
    @media print {
      body { margin: 0; padding: 0; }
      thead { display: table-header-group; }
      tr { page-break-inside: avoid; }
      .no-print { display: none !important; }
      .no-print-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <b>⚠️ অকৃতকার্য শিক্ষার্থীর তালিকা — PDF ও প্রিন্ট প্রিভিউ</b>
      <span style="font-size:11px;opacity:0.9;margin-left:10px;">(📌 PDF ডাউনলোড করতে Destination-এ <b>"Save as PDF"</b> নির্বাচন করুন)</span>
    </div>
    <div style="display:flex;gap:8px;">
      <button type="button" class="btn-action" style="background:#0284c7;color:#fff;" onclick="window.print()">📥 PDF ডাউনলোড / সেভ করুন</button>
      <button type="button" class="btn-action" style="background:#b91c1c;color:#fff;" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
      <button type="button" class="btn-action" onclick="window.close()" style="background:#e2e8f0;color:#0f172a;">✕ বন্ধ করুন</button>
    </div>
  </div>
  <div class="print-container">
    <div class="transcript-official-header">
      <h1 class="transcript-school-name">মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়</h1>
      <div class="transcript-school-line">ডাকঘর: মগড়া, উপজেলা: কালিহাতী, জেলা: টাঙ্গাইল</div>
      <div class="transcript-school-line">স্থাপিত: ১৯৪৬</div>
      <div class="transcript-school-eiin">EIIN: 114290</div>
    </div>

    <div class="marksheet-exam-title-badge">
      <span>⚠️ অকৃতকার্য শিক্ষার্থীদের তালিকা ও প্রতিকারমূলক মূল্যায়ন খতিয়ান</span>
    </div>

    <div class="meta-bar">
      <span><b>শিক্ষাবর্ষ:</b> ${o(O)}</span>
      <span><b>শ্রেণি:</b> ${o(M)}</span>
      <span><b>বিভাগ/শাখা:</b> ${n}</span>
      <span><b>পরীক্ষা:</b> ${t}</span>
      <span><b>তারিখ:</b> ${o(new Date().toLocaleDateString(`bn-BD`))}</span>
    </div>

    <div class="stats-bar">
      <span>মোট পরীক্ষার্থী: <b>${o(r)} জন</b></span>
      <span>মোট অকৃতকার্য: <b style="color:#b91c1c;">${o(i)} জন</b></span>
      <span>অকৃতকার্যের হার: <b>${o(a)}%</b></span>
      <span>১ বিষয়ে ফেল: <b>${o(s)} জন</b></span>
      <span>২ বিষয়ে ফেল: <b>${o(c)} জন</b></span>
      <span>৩ বা ততোধিক বিষয়ে ফেল: <b>${o(l)} জন</b></span>
    </div>

    <table class="failed-table">
      <thead>
        <tr>
          <th style="width:30px;">ক্র.</th>
          <th style="width:38px;">রোল</th>
          <th style="width:65px;">আইডি</th>
          <th style="width:130px;text-align:left;padding-left:6px;">শিক্ষার্থীর নাম</th>
          <th style="width:70px;">বিভাগ/গ্রুপ</th>
          <th style="width:50px;">ফেল সংখ্যা</th>
          <th style="min-width:160px;text-align:left;padding-left:6px;">অকৃতকার্য বিষয়ের বিবরণ ও নম্বর</th>
          <th style="width:45px;">মোট নম্বর</th>
          <th style="width:35px;">GPA</th>
          <th style="width:75px;">অভিভাবকের ফোন</th>
          <th style="width:65px;">মন্তব্য/স্বাক্ষর</th>
        </tr>
      </thead>
      <tbody>
        ${u}
      </tbody>
    </table>

    <div class="signatures-grid">
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">শ্রেণি শিক্ষকের স্বাক্ষর</div>
      </div>
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">প্রস্তুতকারীর স্বাক্ষর</div>
      </div>
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">পরীক্ষা কমিটির আহ্বায়কের স্বাক্ষর</div>
      </div>
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">প্রধান শিক্ষকের স্বাক্ষর ও সিলমোহর</div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  <\/script>
</body>
</html>`;e.document.open(),e.document.write(d),e.document.close()},it=()=>{if(!Q.length){G(`ডাউনলোড করার মতো কোনো অকৃতকার্য শিক্ষার্থী নেই`,`info`);return}let e=e=>{if(e==null)return``;let t=String(e);return t.includes(`,`)||t.includes(`"`)||t.includes(`
`)||t.includes(`\r`)?`"${t.replace(/"/g,`""`)}"`:t},t=[`SL`,`Roll`,`Student_ID`,`Student_Name`,`Department`,`Failed_Count`,`Failed_Subjects`,`Total_Marks`,`GPA`,`Grade`,`Guardian_Phone`],n=Q.map((t,n)=>{let r=pt(t),i=r.length?r.map(e=>`${e.name}${e.total===``?``:` (${e.total})`}`).join(`; `):(t.failed_subjects||[]).join(`; `);return[n+1,e(t.roll_no),e(t.student_id),e(t.name_bn||t.name_en),e(t.department||`সাধারণ`),e(r.length||t.failed_count||1),e(i),e(t.total_marks),e(t.gpa),e(t.final_grade||`F`),e(t.student?.guardian_phone||t.student?.phone||t.guardian_phone||``)].join(`,`)}),r=`﻿`+[t.join(`,`),...n].join(`\r
`),i=new Blob([r],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a;let s=N&&N!==`all`&&N!==`সকল বিভাগ`?N:`All_Dept`;o.setAttribute(`download`,`failed_students_${M}_${s}_${O}.csv`),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(a),G(`অকৃতকার্য শিক্ষার্থীদের তালিকা CSV সফলভাবে ডাউনলোড হয়েছে! ✓`,`success`)},at=()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}if(!Z.length){G(`মেধা তালিকায় প্রদর্শনের মতো কোনো শিক্ষার্থীর ফলাফল নেই`,`error`);return}let e=window.open(``,`_blank`);if(!e){alert(`পপ-আপ উইন্ডো ব্লক করা হয়েছে। দয়া করে ব্রাউজারের পপ-আপ অনুমোদন করুন।`),window.print();return}let t=q?q.name_bn:`পরীক্ষা`,n=K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} বিভাগ`:`সকল বিভাগ/শাখা`,r=Z.length,i=Z.filter(e=>e.is_pass).length,a=r-i,s=Z.filter(e=>Number(e.gpa)>=5&&e.is_pass).length,c=r?(i/r*100).toFixed(1):`0`,l=Z.filter(e=>e.is_pass&&e.final_grade!==`F`&&e.result_status===`উত্তীর্ণ`),u=l.length?l.map((e,t)=>{let n=e.display_merit||e.dept_merit||e.merit||t+1,r=o(n),i=o(e.roll_no||`—`),a=e.student_id||`—`,s=e.name_bn||`—`,c=e.department||`সাধারণ`,l=e.total_marks===void 0?`—`:e.total_marks,u=e.percentage===void 0?`—`:`${e.percentage}%`,d=e.gpa===void 0?`0.00`:e.gpa,f=e.final_grade||`F`,p=e.result_status||`উত্তীর্ণ`,m=e.failed_subjects&&e.failed_subjects.length>0?e.failed_subjects.join(`, `):`সব পাস`;return`
        <tr>
          <td style="text-align:center;"><b class="rank-badge ${n===1?`rank-gold`:n===2?`rank-silver`:n===3?`rank-bronze`:``}">${r}</b></td>
          <td style="text-align:center;"><b>${i}</b></td>
          <td style="text-align:center;font-size:10px;">${a}</td>
          <td style="text-align:left;padding-left:6px;"><b>${s}</b></td>
          <td style="text-align:center;">${c}</td>
          <td style="text-align:center;"><b>${l}</b></td>
          <td style="text-align:center;">${u}</td>
          <td style="text-align:center;font-weight:700;color:#047857;">${d}</td>
          <td style="text-align:center;"><b>${f}</b></td>
          <td style="text-align:center;"><span class="badge-pass">${p}</span></td>
          <td style="text-align:left;padding-left:6px;font-size:10px;color:#475569;">${m}</td>
        </tr>
      `}).join(``):`<tr><td colspan="11" style="text-align:center;padding:16px;color:#dc2626;font-weight:700;">মেধা তালিকায় প্রদর্শনের মতো কোনো উত্তীর্ণ শিক্ষার্থী পাওয়া যায়নি।</td></tr>`,d=`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>মেধা_তালিকা_${M}_${n}_${O}.pdf</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: 'SolaimanLipi', 'Kalpurush', 'Nikosh', 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      color: #0f172a;
      background: #fff;
      font-size: 11px;
    }
    .no-print-bar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #0f172a;
      color: #fff;
      padding: 8px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      margin-bottom: 12px;
    }
    .no-print-bar .btn-action {
      border: none;
      padding: 6px 14px;
      border-radius: 5px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12px;
    }
    .transcript-official-header {
      text-align: center;
      margin-bottom: 6px;
    }
    .transcript-school-name {
      font-size: 24px;
      font-weight: 900;
      color: #0b8050;
      margin: 0 0 2px 0;
      letter-spacing: 0.5px;
      line-height: 1.15;
    }
    .transcript-school-line {
      font-size: 12px;
      color: #334155;
      font-weight: 600;
      line-height: 1.35;
      margin: 0;
    }
    .transcript-school-eiin {
      font-size: 11.5px;
      color: #0f172a;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
    }
    .marksheet-exam-title-badge {
      text-align: center;
      margin: 6px 0 10px 0;
    }
    .marksheet-exam-title-badge span {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 4px 22px;
      border-radius: 9999px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 0.4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 11px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .stats-bar {
      display: flex;
      justify-content: space-around;
      background: #f1f5f9;
      border: 1px dashed #64748b;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10.5px;
      margin-bottom: 10px;
      color: #1e293b;
      font-weight: 600;
    }
    .merit-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      margin-bottom: 20px;
    }
    .merit-table th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      border: 1px solid #64748b;
      padding: 5px 4px;
      text-align: center;
    }
    .merit-table td {
      border: 1px solid #94a3b8;
      padding: 4px 4px;
      vertical-align: middle;
    }
    .rank-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 3px;
      font-size: 11px;
    }
    .rank-gold { background: #fef08a; color: #854d0e; border: 1px solid #eab308; }
    .rank-silver { background: #e2e8f0; color: #334155; border: 1px solid #94a3b8; }
    .rank-bronze { background: #ffedd5; color: #9a3412; border: 1px solid #f97316; }
    .badge-pass { color: #047857; font-weight: 700; }
    .badge-fail { color: #dc2626; font-weight: 700; }
    .signatures-grid {
      display: flex;
      justify-content: space-between;
      margin-top: 35px;
      padding: 0 10px;
      page-break-inside: avoid;
    }
    .sig-col {
      text-align: center;
      width: 23%;
    }
    .sig-dots {
      border-top: 1px dashed #64748b;
      margin-bottom: 4px;
    }
    .sig-title {
      font-size: 11px;
      font-weight: 600;
      color: #334155;
    }
    @media print {
      body { margin: 0; padding: 0; }
      thead { display: table-header-group; }
      tr { page-break-inside: avoid; }
      .no-print { display: none !important; }
      .no-print-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <b>🏆 মেধা তালিকা ও ফলাফল বিবরণী — PDF ও প্রিন্ট প্রিভিউ</b>
      <span style="font-size:11px;opacity:0.9;margin-left:10px;">(📌 PDF ডাউনলোড করতে Destination-এ <b>"Save as PDF"</b> নির্বাচন করুন)</span>
    </div>
    <div style="display:flex;gap:8px;">
      <button type="button" class="btn-action" style="background:#0284c7;color:#fff;" onclick="window.print()">📥 PDF ডাউনলোড / সেভ করুন</button>
      <button type="button" class="btn-action" style="background:#059669;color:#fff;" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
      <button type="button" class="btn-action" onclick="window.close()" style="background:#e2e8f0;color:#0f172a;">✕ বন্ধ করুন</button>
    </div>
  </div>

  <div class="print-container">
    <div class="transcript-official-header">
      <h1 class="transcript-school-name">মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়</h1>
      <div class="transcript-school-line">ডাকঘর: মগড়া, উপজেলা: কালিহাতী, জেলা: টাঙ্গাইল</div>
      <div class="transcript-school-line">স্থাপিত: ১৯৪৬</div>
      <div class="transcript-school-eiin">EIIN: 114290</div>
    </div>

    <div class="marksheet-exam-title-badge">
      <span>🏆 চূড়ান্ত মেধা ও ফলাফল বিবরণী — ${t}</span>
    </div>

    <div class="meta-bar">
      <span><b>শিক্ষাবর্ষ:</b> ${o(O)}</span>
      <span><b>শ্রেণি:</b> শ্রেণি ${o(M)}</span>
      <span><b>বিভাগ/শাখা:</b> ${n}</span>
      <span><b>পরীক্ষা:</b> ${t}</span>
      <span><b>তারিখ:</b> ${o(new Date().toLocaleDateString(`bn-BD`))}</span>
    </div>

    <div class="stats-bar">
      <span>মোট পরীক্ষার্থী: <b>${o(r)} জন</b></span>
      <span>উত্তীর্ণ: <b style="color:#047857;">${o(i)} জন (${o(c)}%)</b></span>
      <span>অনুত্তীর্ণ: <b style="color:#dc2626;">${o(a)} জন</b></span>
      <span>GPA-5.0: <b style="color:#d97706;">${o(s)} জন</b></span>
    </div>

    <table class="merit-table">
      <thead>
        <tr>
          <th style="width:50px;">মেধা স্থান</th>
          <th style="width:40px;">রোল</th>
          <th style="width:65px;">আইডি</th>
          <th style="width:140px;text-align:left;padding-left:6px;">শিক্ষার্থীর নাম</th>
          <th style="width:70px;">বিভাগ/গ্রুপ</th>
          <th style="width:50px;">মোট নম্বর</th>
          <th style="width:45px;">শতকরা</th>
          <th style="width:38px;">GPA</th>
          <th style="width:35px;">গ্রেড</th>
          <th style="width:55px;">ফলাফল</th>
          <th style="min-width:130px;text-align:left;padding-left:6px;">অকৃতকার্য বিষয়</th>
        </tr>
      </thead>
      <tbody>
        ${u}
      </tbody>
    </table>

    <div class="signatures-grid">
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">শ্রেণি শিক্ষকের স্বাক্ষর</div>
      </div>
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">প্রস্তুতকারীর স্বাক্ষর</div>
      </div>
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">পরীক্ষা কমিটির আহ্বায়কের স্বাক্ষর</div>
      </div>
      <div class="sig-col">
        <div class="sig-dots"></div>
        <div class="sig-title">প্রধান শিক্ষকের স্বাক্ষর ও সিলমোহর</div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  <\/script>
</body>
</html>`;e.document.open(),e.document.write(d),e.document.close()},ot=()=>{let e=Z.filter(e=>e.is_pass&&e.final_grade!==`F`&&e.result_status===`উত্তীর্ণ`);if(!e.length){G(`ডাউনলোড করার মতো কোনো উত্তীর্ণ শিক্ষার্থীর মেধা তালিকা নেই`,`info`);return}let t=e=>{if(e==null)return``;let t=String(e);return t.includes(`,`)||t.includes(`"`)||t.includes(`
`)||t.includes(`\r`)?`"${t.replace(/"/g,`""`)}"`:t},n=[`Merit_Rank`,`Roll`,`Student_ID`,`Student_Name`,`Department`,`Total_Marks`,`Percentage`,`GPA`,`Grade`,`Result`,`Failed_Subjects`],r=e.map((e,n)=>{let r=e.display_merit||e.dept_merit||e.merit||n+1;return[t(r),t(e.roll_no),t(e.student_id),t(e.name_bn||e.name_en),t(e.department||`সাধারণ`),t(e.total_marks),t(e.percentage),t(e.gpa),t(e.final_grade||`A+`),t(e.result_status||`উত্তীর্ণ`),t((e.failed_subjects||[]).join(`; `))].join(`,`)}),i=`﻿`+[n.join(`,`),...r].join(`\r
`),a=new Blob([i],{type:`text/csv;charset=utf-8;`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o;let c=N&&N!==`all`&&N!==`সকল বিভাগ`?N:`All_Dept`;s.setAttribute(`download`,`merit_list_${M}_${c}_${O}.csv`),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o),G(`মেধা তালিকা CSV সফলভাবে ডাউনলোড হয়েছে! ✓`,`success`)},st=async e=>{let t=e.target.files?.[0];if(e.target.value=``,t)try{let e=(await t.text()).replace(/^\uFEFF/,``),n=$e(e);if(n.length<2){G(`CSV ফাইলে কোনো ডেটা পাওয়া যায়নি। সঠিক ফাইল নির্বাচন করুন।`,`error`);return}let r=n[0].map(e=>(e||``).trim()),i=e=>(e||``).toLowerCase().replace(/[\u09AF][\u09BC]/g,`য়`).replace(/[\u09DF]/g,`য়`).replace(/[\u09A1][\u09BC]/g,`ড়`).replace(/[\u09A2][\u09BC]/g,`ঢ়`).replace(/ী/g,`ি`).replace(/ূ/g,`ু`).replace(/ণ/g,`ন`).replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e)).replace(/[\s_\-\/\(\)\.]+/g,``),a=r.map(e=>i(e)),l=e=>{if(!e)return!1;let t=String(e).toLowerCase(),n=i(t);return n.includes(`108`)||n.includes(`sub10108`)||n.includes(`sub9108`)?!0:n.includes(`ইংরেজি`)||n.includes(`english`)||n.includes(`eng`)?n.includes(`2nd`)||n.includes(`২য়`)||n.includes(`২`)||n.includes(`2`)||n.includes(`ii`)||n.includes(`second`):!1},u=e=>{if(!e||l(e))return!1;let t=String(e).toLowerCase(),n=i(t);return n.includes(`107`)||n.includes(`sub10107`)||n.includes(`sub9107`)?!0:n.includes(`ইংরেজি`)||n.includes(`english`)||n.includes(`eng`)?n.includes(`1st`)||n.includes(`১ম`)||n.includes(`১`)||n.includes(`1`)||n.includes(`i`)||n.includes(`first`)||!n.includes(`2`):!1},m=e=>a.findIndex(t=>e.some(e=>{let n=i(e);return t.includes(n)||n.length>=4&&n.includes(t)})),h=m([`roll`,`রোল`,`ক্লাসরোল`,`rollno`,`roll_no`]),g=m([`studentid`,`student_id`,`আইডি`,`স্টুডেন্টআইডি`,`id`]),_=m([`studentname`,`name`,`নাম`,`শিক্ষার্থীরনাম`,`student_name`]),v=m([`department`,`dept`,`বিভাগ`,`শাখা`,`গ্রুপ`,`group`]),y=m([`examname`,`exam_name`,`পরীক্ষা`,`পরীক্ষারনাম`,`exam`]),b=m([`absent`,`অনুপস্থিত`,`abs`]),x=m([`remarks`,`মন্তব্য`,`remark`]);if(h===-1&&g===-1){G(`CSV ফাইলে Roll বা Student ID কলাম পাওয়া যায়নি। অনুগ্রহ করে ডাউনলোড করা টেমপ্লেট ব্যবহার করুন।`,`error`);return}let S=(t.name||``).toLowerCase(),ee=S.includes(`class_10`)||S.includes(`class10`)||S.includes(`১০ম`)||S.includes(`ssc`),w=n.slice(1,15).some(e=>{let t=(g!==-1&&e[g]?e[g]:``).toLowerCase(),n=e[5]?String(e[5]).trim():``;return t.includes(`-10-`)||[`102`,`136`,`137`,`138`,`126`,`150`,`134`,`140`,`141`,`142`,`143`,`146`,`147`,`152`].includes(n)}),ne=String(A).toLowerCase().includes(`test`)||(q?.name_bn||``).includes(`নির্বাচন`)||(q?.remarks||``).includes(`১০ম`)||a.some(e=>[`136`,`137`,`138`,`126`,`পদার্থ`,`রসায়ন`,`রসায়ন`,`জীববিজ্ঞান`,`উচ্চতর`].some(t=>e.includes(t))),T=M;(ee||w||ne)&&(T=`10`,M!==`10`&&ae(`10`));let E=A;if(!E){let e=``;if(y!==-1&&n[1]&&n[1][y]&&(e=n[1][y].trim()),e){let t=e.includes(`প্রাক`),n=C.find(n=>{if(!n)return!1;let r=n.name_bn||``;return t?r.includes(`প্রাক`):!r.includes(`প্রাক`)&&(r===e||r.includes(e)||e.includes(r))});n&&(E=n.id,j(n.id))}!E&&C.length>0&&(E=C[0].id,j(E))}let D=N&&N!==`all`&&N!==`সকল বিভাগ`?N:``;if(S.includes(`মানবিক`)||S.includes(`hum`)||S.includes(`arts`)?(D=`মানবিক`,N!==`মানবিক`&&P(`মানবিক`)):S.includes(`বিজ্ঞান`)||S.includes(`sci`)?(D=`বিজ্ঞান`,N!==`বিজ্ঞান`&&P(`বিজ্ঞান`)):(S.includes(`ব্যবসায়`)||S.includes(`ব্যবসা`)||S.includes(`com`)||S.includes(`bs`))&&(D=`ব্যবসায় শিক্ষা`,N!==`ব্যবসায় শিক্ষা`&&P(`ব্যবসায় শিক্ষা`)),v!==-1&&n[1]&&n[1][v]){let e=n[1][v].trim().toLowerCase();e.includes(`বিজ্ঞান`)||e.includes(`sci`)?(D=`বিজ্ঞান`,N!==`বিজ্ঞান`&&P(`বিজ্ঞান`)):e.includes(`মানবিক`)||e.includes(`hum`)||e.includes(`arts`)?(D=`মানবিক`,N!==`মানবিক`&&P(`মানবিক`)):(e.includes(`ব্যবসায়`)||e.includes(`com`)||e.includes(`business`)||e.includes(`bs`))&&(D=`ব্যবসায় শিক্ষা`,N!==`ব্যবসায় শিক্ষা`&&P(`ব্যবসায় শিক্ষা`))}if(!D||D===`all`){let e=n.slice(1,15).map(e=>(g!==-1&&e[g]?e[g]:``).toLowerCase()).join(` `);e.includes(`-hum-`)||e.includes(`hum`)?(D=`মানবিক`,N!==`মানবিক`&&P(`মানবিক`)):e.includes(`-sci-`)||e.includes(`sci`)?(D=`বিজ্ঞান`,N!==`বিজ্ঞান`&&P(`বিজ্ঞান`)):(e.includes(`-bs-`)||e.includes(`bs`)||e.includes(`com`))&&(D=`ব্যবসায় শিক্ষা`,N!==`ব্যবসায় শিক্ষা`&&P(`ব্যবসায় শিক্ষা`))}!D&&N&&N!==`all`&&N!==`সকল বিভাগ`&&(D=N);let re=[];try{let e=await d(`/students?class_name=`+T);Array.isArray(e)&&e.length&&(re=e)}catch{}re.length||(re=Array.isArray(I)&&I.length?I:[]);let ie=te.filter(e=>!e.class_name||String(e.class_name)===String(T)),O=new Map;re.forEach(e=>{e.id&&O.set(`id:${e.id.toLowerCase()}`,e),e.student_id&&O.set(`id:${e.student_id.toLowerCase()}`,e),e.student_code&&O.set(`id:${e.student_code.toLowerCase()}`,e);let t=(e.department||e.group_name||e.group||e.section||``).toLowerCase();(e.id===`stu-10-sci-37`||Number(e.roll_no)===38&&t.includes(`বিজ্ঞান`))&&(O.set(`id:stu-10-sci-38`,e),O.set(`id:stu-10-sci-37`,e),O.set(`ID:STU-10-SCI-38`,e),O.set(`ID:STU-10-SCI-37`,e));let n=(e.department||e.group_name||e.group||e.section||``).toLowerCase();if(e.name_bn){let t=e.name_bn.trim().toLowerCase();O.set(`name:${t}`,e),O.set(`name_clean:${e.name_bn.replace(/\s+/g,``).toLowerCase()}`,e),n&&O.set(`dept_name:${n}_${t}`,e)}if(e.name_en){let t=e.name_en.trim().toLowerCase();O.set(`name:${t}`,e),O.set(`name_clean:${e.name_en.replace(/\s+/g,``).toLowerCase()}`,e),n&&O.set(`dept_name:${n}_${t}`,e)}if(e.roll_no!==void 0&&e.roll_no!==null){let t=String(e.roll_no).trim();n&&(O.set(`dept_roll:${n}_${t}`,e),n.includes(`বিজ্ঞান`)||n.includes(`sci`)?(O.set(`dept_roll:বিজ্ঞান_${t}`,e),O.set(`dept_roll:বিজ্ঞান বিভাগ_${t}`,e),O.set(`dept_roll:science_${t}`,e),O.set(`dept_roll:sci_${t}`,e),O.set(`roll_বিজ্ঞান_${t}`,e),O.set(`roll_sci_${t}`,e),O.set(`roll_বিজ্ঞান_${Number(t)}`,e),O.set(`roll_sci_${Number(t)}`,e)):n.includes(`মানবিক`)||n.includes(`hum`)||n.includes(`arts`)?(O.set(`dept_roll:মানবিক_${t}`,e),O.set(`dept_roll:মানবিক বিভাগ_${t}`,e),O.set(`dept_roll:মানবিক শাখা_${t}`,e),O.set(`dept_roll:humanities_${t}`,e),O.set(`dept_roll:arts_${t}`,e),O.set(`roll_মানবিক_${t}`,e),O.set(`roll_hum_${t}`,e),O.set(`roll_মানবিক_${Number(t)}`,e),O.set(`roll_hum_${Number(t)}`,e)):(n.includes(`ব্যবসায়`)||n.includes(`ব্যবসা`)||n.includes(`com`)||n.includes(`business`)||n.includes(`bs`))&&(O.set(`dept_roll:ব্যবসায় শিক্ষা_${t}`,e),O.set(`dept_roll:ব্যবসায় শিক্ষা বিভাগ_${t}`,e),O.set(`dept_roll:ব্যবসা শিক্ষা_${t}`,e),O.set(`dept_roll:commerce_${t}`,e),O.set(`dept_roll:business_${t}`,e),O.set(`roll_ব্যবসায় শিক্ষা_${t}`,e),O.set(`roll_bs_${t}`,e),O.set(`roll_ব্যবসায় শিক্ষা_${Number(t)}`,e),O.set(`roll_bs_${Number(t)}`,e)));let r=c({department:e.department||e.group_name});r<4&&O.set(`prio_roll:${r}_${t}`,e),O.has(`roll:${t}`)||O.set(`roll:${t}`,e)}});let k=new Map;ie.forEach(e=>{let t=String(e.code),n=o(t),s=(e.name_bn||``).toLowerCase().replace(/[\s_\-]+/g,``),c=(e.name_en||``).toLowerCase().replace(/[\s_\-]+/g,``),d=-1,f=-1,p=-1;a.forEach((a,o)=>{let m=!1;if(m=e.code===`107`?u(r[o])||u(a):e.code===`108`?l(r[o])||l(a):a.includes(t)||a.includes(n)||s.length>=4&&(a.includes(i(s))||i(s).includes(a))||c.length>=4&&(a.includes(i(c))||i(c).includes(a)),!m)return;let h=a.includes(`practical`)||a.includes(`prac`)||a.includes(i(`ব্যবহারিক`)),g=a.includes(`mcq`)||a.includes(i(`এমসিকিউ`))||a.includes(i(`বহুনির্বাচনি`))||a.includes(i(`বহুনির্বাচনী`))||a.includes(i(`নৈর্ব্যক্তিক`)),_=a.includes(`cq`)||a.includes(`written`)||a.includes(i(`লিখিত`))||a.includes(i(`সৃজনশীল`))||a.includes(i(`রচনামূলক`))||a.includes(i(`তত্ত্বীয়`))||a.includes(i(`তত্ত্বীয়`));h?p=o:g?f=o:(_||e.mcq_max===0&&e.practical_max===0||d===-1)&&(d=o)}),(d!==-1||f!==-1||p!==-1)&&k.set(e.id,{sub:e,writtenIdx:d,mcqIdx:f,practicalIdx:p})});let R=[],ce=new Set,B=[],le=X;if(k.size>=2){B=Array.from(k.values()).map(e=>e.sub.name_bn),le=Array.from(k.values())[0]?.sub||X;for(let e=1;e<n.length;e++){let t=n[e];if(!t||!t.length||t.every(e=>!e.trim()))continue;let r=h!==-1&&t[h]?Je(t[h].trim()):``,i=g!==-1&&t[g]?t[g].trim().toLowerCase():``,a=_!==-1&&t[_]?t[_].trim().toLowerCase():``,o=a.replace(/\s+/g,``),s=(v!==-1&&t[v]?t[v].trim().toLowerCase():``)||(D&&D!==`all`&&D!==`সকল বিভাগ`?D.toLowerCase():``);if(i.includes(`-hum-`)||i.includes(`hum`)?s=`মানবিক`:i.includes(`-sci-`)||i.includes(`sci`)?s=`বিজ্ঞান`:(i.includes(`-bs-`)||i.includes(`bs`))&&(s=`ব্যবসায় শিক্ষা`),!s&&a){let e=O.get(`name:${a}`)||O.get(`name_clean:${o}`);e&&e.department&&(s=e.department.toLowerCase())}let l=``;s.includes(`বিজ্ঞান`)||s.includes(`sci`)||i.includes(`-sci-`)?l=`বিজ্ঞান`:s.includes(`মানবিক`)||s.includes(`hum`)||s.includes(`arts`)||i.includes(`-hum-`)?l=`মানবিক`:(s.includes(`ব্যবসায়`)||s.includes(`ব্যবসা`)||s.includes(`com`)||s.includes(`bs`)||i.includes(`-bs-`))&&(l=`ব্যবসায় শিক্ষা`);let u=l?c({department:l}):s?c({department:s}):99,d=i&&O.get(`id:${i}`)||a&&l&&O.get(`dept_name:${l}_${a}`)||r&&l&&(O.get(`roll_${l}_${r}`)||O.get(`roll_${l}_${Number(r)}`))||r&&s&&O.get(`dept_roll:${s}_${r}`)||i&&O.get(`id:${i.replace(/-/g,``)}`)||a&&O.get(`name:${a}`)||o&&O.get(`name_clean:${o}`)||r&&u<4&&O.get(`prio_roll:${u}_${r}`)||!l&&r&&O.get(`roll:${r}`);if(!d)continue;ce.add(d.id);let f=b!==-1&&t[b]?t[b].trim().toLowerCase():``,p=[`yes`,`হ্যাঁ`,`1`,`true`,`abs`,`absent`,`অনুপস্থিত`,`অনু`].some(e=>f.includes(e)),m=x!==-1&&t[x]?t[x].trim():``;k.forEach(({sub:e,writtenIdx:n,mcqIdx:i,practicalIdx:a})=>{let o=n!==-1&&t[n]!==void 0?String(t[n]).trim().toLowerCase():``,c=p||o.includes(`অনু`)||o.includes(`অনুপস্থিত`)||o.includes(`abs`),u=n!==-1&&t[n]!==void 0?Je(t[n]):``,f=i!==-1&&t[i]!==void 0?Je(t[i]):``,h=a!==-1&&t[a]!==void 0?Je(t[a]):``;if(e.written_max===0&&e.mcq_max>0){if(u!==``&&(f===``||f==null)){let t=parseFloat(u)||0;if(h!==``&&h!=null)f=String(Math.min(t,e.mcq_max)),u=`0`;else if(t>e.mcq_max){let n=e.practical_max>0?Math.min(e.practical_max,25):0,r=Math.min(e.mcq_max,Math.max(0,t-n));f=String(r),h=String(t-r),u=`0`}else f=String(t),u=`0`}else u!==``&&(h===``||h==null)&&f!==``&&(h=String(Math.min(parseFloat(u)||0,e.practical_max||0)),u=`0`)}u!==``&&e.written_max>0&&parseFloat(u)>e.written_max&&(u=String(e.written_max)),f!==``&&e.mcq_max>0&&parseFloat(f)>e.mcq_max&&(f=String(e.mcq_max)),h!==``&&e.practical_max>0&&parseFloat(h)>e.practical_max&&(h=String(e.practical_max)),(u!==``||f!==``||h!==``||c)&&R.push({exam_id:E,class_name:T,student_id:d.id,student_code:d.student_id||d.id,roll_no:d.roll_no!==void 0&&d.roll_no!==null?d.roll_no:r,department:d.department||s||l||`মানবিক`,subject_id:e.id,subject_code:e.code,written:c?0:u,mcq:c?0:f,practical:c?0:h,absent:c,remarks:m})})}}else{let e=m([`subjectcode`,`subject_code`,`বিষয়কোড`,`কোড`,`code`,`subcode`]),t=m([`subjectname`,`subject_name`,`বিষয়`,`বিষয়েরনাম`,`subject`]),r=m(`writtencq.written.cq.লিখিত.সৃজনশীল.রচনামূলক.বর্ণনামূলক.তত্ত্বীয়.তত্ত্বীয়.theory.sub1.mark.marks.নম্বর.প্রাপ্তনম্বর.প্রাপ্ত_নম্বর.obttotal.total.english.english1.english2.english1st.english2nd.eng.eng1.eng2.ইংরেজি.ইংরেজী.ইংরেজি১ম.ইংরেজি২য়.ইংরেজী১ম.ইংরেজী২য়.ইংরেজি১মপত্র.ইংরেজি২য়পত্র.ইংরেজী১মপত্র.ইংরেজী২য়পত্র.107.108.sub10107.sub10108`.split(`.`)),o=m([`mcq`,`এমসিকিউ`,`বহুনির্বাচনি`,`বহুনির্বাচনী`,`নৈর্ব্যক্তিক`,`নৈর্ব্যক্তিক_নম্বর`,`objective`]),s=m([`practical`,`ব্যবহারিক`,`ব্যবহারিক_নম্বর`,`prac`]);if(r===-1&&d){let e=i(d.name_bn||``),t=i(d.name_en||``),c=i(String(d.code||``)),l=a.findIndex((n,r)=>r===h||r===g||r===_||r===v||r===o||r===s?!1:c&&n.includes(c)||e&&(n.includes(e)||e.includes(n))||t&&(n.includes(t)||t.includes(n)));if(l!==-1)r=l;else{let e=a.findIndex((e,t)=>t===h||t===g||t===_||t===v||t===y||t===b||t===x?!1:n.slice(1,5).some(e=>e[t]&&!isNaN(parseFloat(Je(e[t])))));e!==-1&&(r=e)}}let d=X,f=new Set;for(let a=1;a<n.length;a++){let p=n[a];if(!p||!p.length||p.every(e=>!e.trim()))continue;let m=d,y=(e!==-1&&p[e]?String(p[e]).trim():``).replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e)).trim(),S=t!==-1&&p[t]?String(p[t]).trim():``,C=i(S);if(y){let e=ie.find(e=>String(e.code)===y||String(e.code).replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e))===y)||te.find(e=>(String(e.code)===y||String(e.code).replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e))===y)&&String(e.class_name)===T);e&&(m=e)}else if(S){if(l(S))m=ie.find(e=>String(e.code)===`108`)||te.find(e=>String(e.code)===`108`&&String(e.class_name)===T)||m;else if(u(S))m=ie.find(e=>String(e.code)===`107`)||te.find(e=>String(e.code)===`107`&&String(e.class_name)===T)||m;else{let e=ie.find(e=>{let t=i(e.name_bn||``),n=i(e.name_en||``);return t&&(t.includes(C)||C.includes(t))||n&&(n.includes(C)||C.includes(n))})||te.find(e=>{if(String(e.class_name)!==T)return!1;let t=i(e.name_bn||``),n=i(e.name_en||``);return t&&(t.includes(C)||C.includes(t))||n&&(n.includes(C)||C.includes(n))});e&&(m=e)}}if(m||=X,!m)continue;f.add(m.name_bn);let ee=h!==-1&&p[h]?Je(p[h].trim()):``,w=g!==-1&&p[g]?p[g].trim().toLowerCase():``,ne=_!==-1&&p[_]?p[_].trim().toLowerCase():``,re=ne.replace(/\s+/g,``),k=v!==-1&&p[v]?p[v].trim().toLowerCase():``;if(w.includes(`-hum-`)||w.includes(`hum`)?k=`মানবিক`:w.includes(`-sci-`)||w.includes(`sci`)?k=`বিজ্ঞান`:(w.includes(`-bs-`)||w.includes(`bs`))&&(k=`ব্যবসায় শিক্ষা`),!k&&ne){let e=O.get(`name:${ne}`)||O.get(`name_clean:${re}`);e&&e.department&&(k=e.department.toLowerCase())}if(!k&&m?.department&&![`আবশ্যিক`,`সাধারণ`].includes(m.department)&&(k=m.department.toLowerCase()),!k&&m?.code){let e=String(m.code);[`136`,`137`,`138`,`126`].includes(e)?k=`বিজ্ঞান`:[`146`,`152`,`143`].includes(e)?k=`ব্যবসায় শিক্ষা`:[`153`,`110`,`141`,`140`,`151`].includes(e)&&(k=`মানবিক`)}!k&&D&&D!==`all`&&D!==`সকল বিভাগ`&&(k=D.toLowerCase());let A=``;k.includes(`বিজ্ঞান`)||k.includes(`sci`)||w.includes(`-sci-`)?A=`বিজ্ঞান`:k.includes(`মানবিক`)||k.includes(`hum`)||k.includes(`arts`)||w.includes(`-hum-`)?A=`মানবিক`:(k.includes(`ব্যবসায়`)||k.includes(`ব্যবসা`)||k.includes(`com`)||k.includes(`bs`)||w.includes(`-bs-`))&&(A=`ব্যবসায় শিক্ষা`);let j=A?c({department:A}):k?c({department:k}):99,M=w&&O.get(`id:${w}`)||ne&&A&&O.get(`dept_name:${A}_${ne}`)||ne&&O.get(`name:${ne}`)||re&&O.get(`name_clean:${re}`)||ee&&A&&(O.get(`roll_${A}_${ee}`)||O.get(`roll_${A}_${Number(ee)}`))||ee&&k&&O.get(`dept_roll:${k}_${ee}`)||w&&O.get(`id:${w.replace(/-/g,``)}`)||ee&&j<4&&O.get(`prio_roll:${j}_${ee}`)||!A&&ee&&O.get(`roll:${ee}`);if(!M)continue;ce.add(M.id);let ae=b!==-1&&p[b]?p[b].trim().toLowerCase():``,N=r!==-1&&p[r]!==void 0?String(p[r]).trim().toLowerCase():``,P=[`yes`,`হ্যাঁ`,`1`,`true`,`abs`,`absent`,`অনুপস্থিত`,`অনু`].some(e=>ae.includes(e))||N.includes(`অনু`)||N.includes(`অনুপস্থিত`)||N.includes(`abs`),oe=x!==-1&&p[x]?p[x].trim():``,F=P?`0`:r!==-1&&p[r]!==void 0?Je(p[r]):``,I=P?`0`:o!==-1&&p[o]!==void 0?Je(p[o]):``,L=P?`0`:s!==-1&&p[s]!==void 0?Je(p[s]):``,se=Number(m.written_max)||0,z=Number(m.mcq_max)||0,B=Number(m.practical_max)||0;if(!P&&se===0&&z>0){if(F!==``&&(I===``||I==null)){let e=parseFloat(F)||0;if(L!==``&&L!=null)I=String(Math.min(e,z)),F=`0`;else if(e>z){let t=Math.min(z,Math.max(0,e-(B>0?Math.min(B,25):0)));I=String(t),L=String(e-t),F=`0`}else I=String(e),F=`0`}else F!==``&&(L===``||L==null)&&I!==``&&(L=String(Math.min(parseFloat(F)||0,B)),F=`0`)}F!==``&&se>0&&parseFloat(F)>se&&(F=String(se)),I!==``&&z>0&&parseFloat(I)>z&&(I=String(z)),L!==``&&B>0&&parseFloat(L)>B&&(L=String(B)),R.push({exam_id:E,class_name:T,student_id:M.id,student_code:M.student_id||M.id,roll_no:M.roll_no!==void 0&&M.roll_no!==null?M.roll_no:ee,department:M.department||k||A||`মানবিক`,subject_id:m.id,subject_code:m.code,written:P?0:F,mcq:P?0:I,practical:P?0:L,absent:P,remarks:oe,updated_at:new Date().toISOString()})}if(B=Array.from(f),f.size===1){let e=ie.find(e=>e.name_bn===B[0])||te.find(e=>e.name_bn===B[0]&&String(e.class_name)===T);e&&(le=e,e.id!==oe&&F(e.id))}}if(!R.length||ce.size===0){G(`CSV ফাইলের রোলের সাথে বর্তমান শ্রেণির কোনো শিক্ষার্থীর রোল বা আইডি মেলেনি। সঠিক শ্রেণির CSV আপলোড করুন।`,`error`);return}await d(`/marks/bulk`,{method:`POST`,body:JSON.stringify({exam_id:E,records:R})}),A&&String(A)!==String(E)&&await d(`/marks/bulk`,{method:`POST`,body:JSON.stringify({exam_id:A,records:R.map(e=>({...e,exam_id:A}))})});let V=await d(`/results/process`,{method:`POST`,body:JSON.stringify({exam_id:E,class_name:T})});A&&String(A)!==String(E)&&await d(`/results/process`,{method:`POST`,body:JSON.stringify({exam_id:A,class_name:T})}),Array.isArray(V.summary)&&z(V.summary),await lt(!0);let ue=le||X,de=re.filter(e=>!(ue&&!p(ue,e)||D&&D!==`all`&&D!==`সকল বিভাগ`&&!f(e,D))),fe=s(de);L(fe);let H=new Map;if(R.forEach(e=>{let t=String(e.student_id).toLowerCase();H.set(t,e),e.student_code&&H.set(String(e.student_code).toLowerCase(),e)}),ue){let e=fe.map(e=>{let t=String(e.id||``).toLowerCase(),n=String(e.student_id||e.id||``).toLowerCase(),r=H.get(t)||H.get(n)||{};return{student_id:e.id,student_code:e.student_id||e.id||`STU-`+e.roll_no,roll_no:e.roll_no!==void 0&&e.roll_no!==null?e.roll_no:``,name_bn:e.name_bn||e.name_en||``,department:e.department||e.group_name||e.group||`সাধারণ`,subject_id:ue.id,subject_code:ue.code,written:r.written!==null&&r.written!==void 0?r.written:``,mcq:r.mcq!==null&&r.mcq!==void 0?r.mcq:``,practical:r.practical!==null&&r.practical!==void 0?r.practical:``,absent:!!r.absent,remarks:r.remarks||``}});se(e)}await lt(!0);let pe=B.length>1?`${o(B.length)}টি বিষয় (${B.slice(0,3).join(`, `)}${B.length>3?`...`:``})`:`"${ue?.name_bn||B[0]||`বিষয়`}"`;G(`🎉 অভিনন্দন! CSV ফাইল থেকে ${pe} এর ${o(ce.size)} জন শিক্ষার্থীর নম্বর সফলভাবে সেভ ও মাস্টার শিটে প্রসেস করা হয়েছে! ✓`,`success`)}catch(e){console.error(`CSV import error:`,e),G(`CSV ফাইল আপলোড ব্যর্থ: `+e.message,`error`)}},ct=async()=>{if(!A){G(`অনুগ্রহ করে আগে পরীক্ষা নির্বাচন করুন`,`error`);return}try{let e=await d(`/results/process`,{method:`POST`,body:JSON.stringify({exam_id:A,class_name:M})}),t=Array.isArray(e.summary)?e.summary:[];z(t);let n=await d(`/results/analysis?exam_id=${A}&class_name=${M}&force=1`);ue(n),G(`ফলাফল প্রসেসিং সফল! শ্রেণি ${o(M)} এর ${o(e.count)} জন শিক্ষার্থীর গ্রেড ও মেধা তালিকা প্রস্তুত।`,`success`)}catch(e){G(`ফলাফল প্রসেসিং ব্যর্থ: `+e.message,`error`)}},lt=async(e=!1)=>{if(A)try{if(e){let e=await d(`/results/process`,{method:`POST`,body:JSON.stringify({exam_id:A,class_name:M})});Array.isArray(e.summary)&&z(e.summary)}else{let e=await d(`/results/summary?exam_id=${A}&class_name=${M}&force=1`);if(Array.isArray(e)&&e.length)z(e);else{let e=await d(`/results/process`,{method:`POST`,body:JSON.stringify({exam_id:A,class_name:M})});Array.isArray(e.summary)&&z(e.summary)}}let t=await d(`/results/analysis?exam_id=${A}&class_name=${M}&force=1`);ue(t)}catch(e){console.warn(`Load processed results warning:`,e)}};(0,l.useEffect)(()=>{[`merit`,`failed_list`,`tabulation`,`marksheet`,`analysis`,`processing`].includes(y)&&A&&lt(!0)},[y,A,M,N]),(0,l.useEffect)(()=>{le(0)},[N,M,A]);let Z=(0,l.useMemo)(()=>{let e=K&&N&&N!==`all`&&N!==`সকল বিভাগ`,t=ce;e&&(t=ce.filter(e=>f(e.student||e,N)));let n=t.map(e=>({...e}));if(e){let e=n.filter(e=>e.is_pass),t=n.filter(e=>!e.is_pass);e.sort((e,t)=>{let n=Number(t.gpa)-Number(e.gpa);if(Math.abs(n)>.001)return n;let r=(Number(t.total_marks)||0)-(Number(e.total_marks)||0);return r===0?(Number(e.roll_no)||0)-(Number(t.roll_no)||0):r}),t.sort((e,t)=>{let n=(Number(t.total_marks)||0)-(Number(e.total_marks)||0);return n===0?(Number(e.roll_no)||0)-(Number(t.roll_no)||0):n});let r=1;return e.forEach(e=>{e.dept_merit=r,e.display_merit=r,e.dept_total=n.length,r++}),t.forEach(e=>{e.dept_merit=null,e.display_merit=null,e.dept_total=n.length}),[...e,...t]}{let e=1;return n.forEach(t=>{t.is_pass?(t.display_merit=t.merit||e,t.dept_merit=t.merit||e,e++):(t.display_merit=null,t.dept_merit=null)}),n}},[ce,K,N]),ut=(0,l.useMemo)(()=>[...Z].sort((e,t)=>{let n=Number(e.roll_no)||0,r=Number(t.roll_no)||0;return n===r?(e.student_id||``).localeCompare(t.student_id||``):n-r}),[Z]),dt=(0,l.useMemo)(()=>Z.filter(e=>e.is_pass&&e.final_grade!==`F`&&e.result_status===`উত্তীর্ণ`),[Z]),Q=(0,l.useMemo)(()=>Z.filter(e=>!e.is_pass||e.final_grade===`F`||e.result_status!==`উত্তীর্ণ`).sort((e,t)=>{let n=Number(e.roll_no)||0,r=Number(t.roll_no)||0;return n===r?(e.student_id||``).localeCompare(t.student_id||``):n-r}),[Z]),ft=(0,l.useMemo)(()=>ve===`1`?Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||1)===1):ve===`2`?Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||0)===2):ve===`3+`?Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||0)>=3):Q,[Q,ve]),pt=e=>{if(!e)return[];if(Array.isArray(e.subjects)&&e.subjects.length>0){let t=e.subjects.filter(e=>!e.is_pass||e.letter_grade===`F`);if(t.length>0)return t.map(e=>({name:e.subject_name||e.code,code:e.code,total:e.total!==null&&e.total!==void 0?e.total:``,grade:e.letter_grade||`F`,written:e.written,mcq:e.mcq,practical:e.practical,reason:e.fail_reason||``}))}return Array.isArray(e.failed_subjects)&&e.failed_subjects.length>0?e.failed_subjects.map(e=>({name:e,code:``,total:``,grade:`F`,reason:``})):[]},$=(0,l.useMemo)(()=>{if(!Z.length)return null;let e=Math.max(0,Math.min(B,Z.length-1));return Z[e]},[Z,B]),mt={101:`BANGLA-I`,102:`BANGLA-II`,107:`ENGLISH-I`,108:`ENGLISH-II`,109:`MATHEMATICS`,110:`GEOGRAPHY AND ENVIRONMENT`,111:`ISLAM AND MORAL EDUCATION`,112:`HINDU RELIGION AND MORAL EDUCATION`,113:`BUDDHIST RELIGION AND MORAL EDUCATION`,114:`CHRISTIAN RELIGION AND MORAL EDUCATION`,126:`HIGHER MATHEMATICS`,127:`GENERAL SCIENCE`,134:`AGRICULTURE STUDIES`,136:`PHYSICS`,137:`CHEMISTRY`,138:`BIOLOGY`,140:`CIVICS AND CITIZENSHIP`,141:`ECONOMICS`,142:`CIVICS AND CITIZENSHIP`,143:`HISTORY OF BANGLADESH AND WORLD CIVILIZATION`,146:`ACCOUNTING`,147:`FINANCE AND BANKING`,150:`BANGLADESH AND GLOBAL STUDIES`,151:`HOME SCIENCE`,152:`BUSINESS ENTREPRENEURSHIP`,153:`HISTORY OF BANGLADESH AND WORLD CIVILIZATION`,154:`INFORMATION AND COMMUNICATION TECHNOLOGY`},ht=e=>{if(!e)return``;let t=String(e.code||``).trim().replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e));return mt[t]?mt[t]:e.name_en&&e.name_en.trim()?e.name_en.trim().toUpperCase():e.name_bn||``},gt=e=>{if(!e?.subjects)return[];let t=[...e.subjects],n=t.some(e=>String(e.code)===`126`),r=t.some(e=>String(e.code)===`134`);if(n&&r){let n=t.find(e=>String(e.code)===`126`),r=t.find(e=>String(e.code)===`134`),i=e.student||e,a=(i.fourth_subject||i.fourth_subject_code||i.optional_subject||``).toString().toLowerCase(),o=`126`;if(a.includes(`134`)||a.includes(`কৃষি`))o=`134`;else if(a.includes(`126`)||a.includes(`উচ্চতর`)||a.includes(`গণিত`))o=`126`;else{let e=!n?.absent&&(Number(n?.total)>0||Number(n?.written)>0||Number(n?.mcq)>0||Number(n?.practical)>0);o=!r?.absent&&(Number(r?.total)>0||Number(r?.written)>0||Number(r?.mcq)>0||Number(r?.practical)>0)&&!e?`134`:`126`}t=t.filter(e=>{let t=String(e.code);return t===`126`||t===`134`?t===o:!0})}let i=t.some(e=>String(e.code)===`151`);if(r&&i){let n=t.find(e=>String(e.code)===`134`),r=t.find(e=>String(e.code)===`151`),i=e.student||e,a=(i.fourth_subject||i.fourth_subject_code||i.optional_subject||``).toString().toLowerCase(),o=`134`;if(a.includes(`151`)||a.includes(`গার্হস্থ্য`)||a.includes(`home`))o=`151`;else{let e=!n?.absent&&(Number(n?.total)>0||Number(n?.written)>0||Number(n?.mcq)>0||Number(n?.practical)>0);o=!r?.absent&&(Number(r?.total)>0||Number(r?.written)>0||Number(r?.mcq)>0||Number(r?.practical)>0)&&!e?`151`:`134`}t=t.filter(e=>{let t=String(e.code);return t===`134`||t===`151`?t===o:!0})}let a=(e.department||e.student?.department||``).toLowerCase();return(a.includes(`মানবিক`)||a.includes(`humanities`)||a.includes(`arts`)||a.includes(`আর্টস`))&&(t=t.filter(e=>String(e.code)!==`140`||!e.absent&&(Number(e.total)>0||Number(e.written)>0||Number(e.mcq)>0||Number(e.practical)>0))),t.sort((e,t)=>e.is_optional&&!t.is_optional?1:!e.is_optional&&t.is_optional?-1:(Number(String(e.code||``).replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e)))||999)-(Number(String(t.code||``).replace(/[০-৯]/g,e=>`০১২৩৪৫৬৭৮৯`.indexOf(e)))||999))},_t=(0,l.useMemo)(()=>gt($),[$]),vt=K&&_t.some(e=>String(e.code)===`101`)&&_t.some(e=>String(e.code)===`102`),yt=K&&_t.some(e=>String(e.code)===`107`)&&_t.some(e=>String(e.code)===`108`),bt=_t.find(e=>String(e.code)===`101`),xt=_t.find(e=>String(e.code)===`102`),St=(bt&&!bt.absent?Number(bt.total||0):0)+(xt&&!xt.absent?Number(xt.total||0):0),Ct=_t.find(e=>String(e.code)===`107`),wt=_t.find(e=>String(e.code)===`108`),Tt=(Ct&&!Ct.absent?Number(Ct.total||0):0)+(wt&&!wt.absent?Number(wt.total||0):0),Et=e=>{if(!e)return``;let t=gt(e),n=K&&t.some(e=>String(e.code)===`101`)&&t.some(e=>String(e.code)===`102`),r=K&&t.some(e=>String(e.code)===`107`)&&t.some(e=>String(e.code)===`108`),i=t.find(e=>String(e.code)===`101`),a=t.find(e=>String(e.code)===`102`),s=(i&&!i.absent?Number(i.total||0):0)+(a&&!a.absent?Number(a.total||0):0),c=t.find(e=>String(e.code)===`107`),l=t.find(e=>String(e.code)===`108`),u=(c&&!c.absent?Number(c.total||0):0)+(l&&!l.absent?Number(l.total||0):0),d=t.map(e=>{let t=String(e.code||``);if(t===`101`)return`
          <tr>
            <td><b>101</b></td>
            <td class="text-left"><b>BANGLA-I</b></td>
            <td>${e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:0}</td>
            <td>${e.absent?`অনুপস্থিত`:e.mcq!==``&&e.mcq!==null&&e.mcq!==void 0?e.mcq:0}</td>
            <td rowspan="${n?2:1}">—</td>
            <td rowspan="${n?2:1}"><b>${n?s:e.absent?0:e.total}</b></td>
            <td rowspan="${n?2:1}" class="transcript-grade-cell">
              <div class="grade-letter">${e.letter_grade||`F`}</div>
              <div class="grade-gp">GP ${Number(e.gp||0).toFixed(2)}</div>
            </td>
          </tr>
        `;if(t===`102`)return`
          <tr>
            <td><b>102</b></td>
            <td class="text-left"><b>BANGLA-II</b></td>
            <td>${e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:0}</td>
            <td>${e.absent?`অনুপস্থিত`:e.mcq!==``&&e.mcq!==null&&e.mcq!==void 0?e.mcq:0}</td>
            ${n?``:`
              <td>—</td>
              <td><b>${e.absent?0:e.total}</b></td>
              <td class="transcript-grade-cell">
                <div class="grade-letter">${e.letter_grade||`F`}</div>
                <div class="grade-gp">GP ${Number(e.gp||0).toFixed(2)}</div>
              </td>
            `}
          </tr>
        `;if(t===`107`)return`
          <tr>
            <td><b>107</b></td>
            <td class="text-left"><b>ENGLISH-I</b></td>
            <td>${e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:e.total}</td>
            <td rowspan="${r?2:1}">—</td>
            <td rowspan="${r?2:1}">—</td>
            <td rowspan="${r?2:1}"><b>${r?u:e.absent?0:e.total}</b></td>
            <td rowspan="${r?2:1}" class="transcript-grade-cell">
              <div class="grade-letter">${e.letter_grade||`F`}</div>
              <div class="grade-gp">GP ${Number(e.gp||0).toFixed(2)}</div>
            </td>
          </tr>
        `;if(t===`108`)return`
          <tr>
            <td><b>108</b></td>
            <td class="text-left"><b>ENGLISH-II</b></td>
            <td>${e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:e.total}</td>
            ${r?``:`
              <td>—</td>
              <td>—</td>
              <td><b>${e.absent?0:e.total}</b></td>
              <td class="transcript-grade-cell">
                <div class="grade-letter">${e.letter_grade||`F`}</div>
                <div class="grade-gp">GP ${Number(e.gp||0).toFixed(2)}</div>
              </td>
            `}
          </tr>
        `;let i=!!e.absent,a=i?`অনুপস্থিত`:e.written_max>0?e.written!==``&&e.written!==null&&e.written!==void 0?e.written:0:`—`,o=i?`অনুপস্থিত`:e.mcq_max>0?e.mcq!==``&&e.mcq!==null&&e.mcq!==void 0?e.mcq:0:`—`,c=i?`—`:e.practical_max>0?e.practical!==``&&e.practical!==null&&e.practical!==void 0?e.practical:0:`—`;return`
        <tr>
          <td><b>${e.code}</b></td>
          <td class="text-left"><b>${ht(e)}</b></td>
          <td>${a}</td>
          <td>${o}</td>
          <td>${c}</td>
          <td><b>${i?0:e.total}</b></td>
          <td class="transcript-grade-cell">
            <div class="grade-letter">${e.letter_grade||`F`}</div>
            <div class="grade-gp">GP ${Number(e.gp||0).toFixed(2)}</div>
          </td>
        </tr>
      `}).join(``);return`
      <div class="official-marksheet-wrapper">
        <div class="transcript-top-content">
          <div class="transcript-official-header">
            <h1 class="transcript-school-name">মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়</h1>
            <div class="transcript-school-line">ডাকঘর: মগড়া, উপজেলা: কালিহাতী, জেলা: টাঙ্গাইল</div>
            <div class="transcript-school-line">স্থাপিত: ১৯৪৬</div>
            <div class="transcript-school-eiin">EIIN: 114290</div>
          </div>

          <div class="marksheet-exam-title-badge">
            <span>${He}</span>
          </div>

          <div class="marksheet-top-info-grid">
            <div class="marksheet-student-card">
              <div class="info-row"><b>শিক্ষার্থীর নাম:</b> ${e.name_bn} ${e.name_en?`(${e.name_en.toUpperCase()})`:``}</div>
              <div class="info-row"><b>Student ID:</b> ${e.student_id} | <b>রোল নম্বর:</b> ${o(e.roll_no)}</div>
              <div class="info-row"><b>শ্রেণি:</b> শ্রেণি ${o(M)} | <b>শাখা:</b> ${e.section||(K?`বিজ্ঞান বিভাগ`:`A`)}</div>
              <div class="info-row"><b>বিভাগ / গ্রুপ:</b> ${e.department||(K?`বিজ্ঞান`:`সাধারণ`)}</div>
            </div>
            <div class="marksheet-student-card">
              <div class="info-row"><b>পিতার নাম:</b> ${e.student?.father_name||e.father_name||`মুহাম্মদ আবুবকর সিদ্দিক`}</div>
              <div class="info-row"><b>মাতার নাম:</b> ${e.student?.mother_name||e.mother_name||`তাহমিনা`}</div>
              <div class="info-row"><b>শিক্ষাবর্ষ:</b> ${o(O)} খ্রি.</div>
              <div class="info-row"><b>পরীক্ষার নাম:</b> ${q?q.name_bn:J?`নির্বাচনী পরীক্ষা`:`অর্ধ-বার্ষিক পরীক্ষা`}</div>
            </div>
          </div>

          <table class="marksheet-subjects-table marksheet-board-table">
            <thead>
              <tr>
                <th rowspan="2" style="width: 75px;">Subject Code</th>
                <th rowspan="2" style="text-align: center;">Subject Name</th>
                <th colspan="4">Marks</th>
                <th rowspan="2" style="width: 80px;">Grade</th>
              </tr>
              <tr>
                <th style="width: 75px;">CQ/Theory</th>
                <th style="width: 65px;">MCQ</th>
                <th style="width: 65px;">Practical</th>
                <th style="width: 70px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${d}
            </tbody>
          </table>

          <div class="transcript-summary-box">
            <div>
              <div class="summary-label">সর্বমোট প্রাপ্ত নম্বর</div>
              <div class="summary-val">${e.total_marks||0}</div>
            </div>
            <div>
              <div class="summary-label">প্রাপ্ত শতকরা (%)</div>
              <div class="summary-val">${e.percentage||0}%</div>
            </div>
            <div>
              <div class="summary-label">গ্রেড পয়েন্ট (GPA)</div>
              <div class="summary-val green-text">${e.gpa||`0.00`}</div>
            </div>
            <div>
              <div class="summary-label">চূড়ান্ত লেটার গ্রেড</div>
              <div class="summary-val green-text">${e.final_grade||`F`}</div>
            </div>
            <div>
              <div class="summary-label">ফলাফল স্ট্যাটাস</div>
              <div class="summary-val green-text status-text">${e.result_status||`অকৃতকার্য`}</div>
            </div>
            <div>
              <div class="summary-label">${K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} মেধা স্থান`:`শ্রেণি মেধা স্থান`}</div>
              <div class="summary-val">${e.display_merit||e.dept_merit||e.merit?`${o(e.display_merit||e.dept_merit||e.merit)} তম`:`—`}</div>
            </div>
          </div>
        </div>

        <div class="transcript-bottom-content">
          <div class="transcript-signatures-zone ${ze?`four-columns`:`three-columns`}">
            <div class="sig-column">
              <div class="sig-dots">${Ve}</div>
              <div class="sig-title">শ্রেণি শিক্ষকের স্বাক্ষর</div>
            </div>
            ${ze?`
              <div class="sig-column">
                <div class="sig-dots">${Ve}</div>
                <div class="sig-title">প্রস্তুতকারীর স্বাক্ষর</div>
              </div>
              <div class="sig-column">
                <div class="sig-dots">${Ve}</div>
                <div class="sig-title">অভিভাবকের স্বাক্ষর</div>
              </div>
            `:`
              <div class="sig-column">
                <div class="sig-dots">${Ve}</div>
                <div class="sig-title">${Be}</div>
              </div>
            `}
            <div class="sig-column">
              <div class="sig-dots">${Ve}</div>
              <div class="sig-title">প্রধান শিক্ষকের স্বাক্ষর ও সিলমোহর</div>
            </div>
          </div>

          <!-- স্বাক্ষরের নিচে সিলদেয়ার জায়গা (Space for Official Seal below Signature) -->
          <div class="transcript-seal-space" style="height: 52px; margin: 6px 0 8px 0;"></div>

          <div class="transcript-footer-line">
            <span>ফলাফল প্রকাশের তারিখ: ${o(new Date().toLocaleDateString(`bn-BD`))} খ্রি.</span>
            <span>মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়, কালিহাতী, টাঙ্গাইল — কম্পিউটার প্রস্তুতকৃত ${Ue}</span>
          </div>
        </div>
      </div>
    `},Dt=e=>{let t=e&&e.length?e:Z;if(!t||!t.length){G(`প্রিন্ট করার মতো কোনো শিক্ষার্থী পাওয়া যায়নি।`,`error`);return}let n=window.open(``,`_blank`,`width=950,height=900`);if(!n){alert(`পপ-আপ উইন্ডো ব্লক করা রয়েছে। অনুগ্রহ করে ব্রাউজার পপ-আপ অনুমোদন করুন।`);return}let r=t.map(e=>Et(e)).join(`
`);n.document.write(`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>${J?`একাডেমিক_ট্রান্সক্রিপ্ট`:`মার্কশিট_ও_প্রোগ্রেস_রিপোর্ট`}_${M}_${O}.pdf</title>
  <style>
    @page { 
      size: A4 portrait; 
      margin: 5mm 6mm; 
    }
    * { 
      box-sizing: border-box; 
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important; 
    }
    body { 
      margin: 0; 
      padding: 0; 
      font-family: 'Noto Sans Bengali', system-ui, -apple-system, sans-serif; 
      background: #fff; 
      color: #000; 
    }
    .official-marksheet-wrapper { 
      width: 100%; 
      max-width: 194mm; 
      height: 284mm; 
      min-height: 284mm; 
      max-height: 284mm; 
      margin: 0 auto; 
      background: #fff; 
      border: 1.5px solid #000; 
      border-radius: 4px; 
      padding: 5mm 8mm; 
      box-sizing: border-box; 
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-inside: avoid !important; 
      break-inside: avoid !important; 
      page-break-after: always; 
      break-after: page; 
      overflow: hidden;
    }
    .official-marksheet-wrapper:last-child { 
      page-break-after: auto; 
      break-after: auto; 
      margin-bottom: 0; 
    }
    .transcript-top-content {
      display: flex;
      flex-direction: column;
    }
    .transcript-official-header { 
      text-align: center; 
      margin-bottom: 6px; 
    }
    .transcript-school-name { 
      margin: 0 0 2px 0; 
      font-size: 22px; 
      color: #0b8050; 
      font-weight: 800; 
      letter-spacing: 0.3px; 
      line-height: 1.2; 
    }
    .transcript-school-line { 
      margin: 1.5px 0; 
      font-size: 11.5px; 
      color: #1e293b; 
      font-weight: 500; 
      line-height: 1.25; 
    }
    .transcript-school-eiin { 
      margin: 1.5px 0 0 0; 
      font-size: 11.5px; 
      color: #1e293b; 
      font-weight: 700; 
      line-height: 1.25; 
    }
    .marksheet-exam-title-badge { 
      text-align: center; 
      margin: 6px 0 8px 0; 
    }
    .marksheet-exam-title-badge span { 
      display: inline-block; 
      background: #1e293b; 
      color: #fff; 
      padding: 4px 22px; 
      border-radius: 9999px; 
      font-size: 12.5px; 
      font-weight: 700; 
      letter-spacing: 0.4px; 
    }
    .marksheet-top-info-grid { 
      display: grid; 
      grid-template-columns: 1.15fr 0.85fr; 
      gap: 10px; 
      margin-bottom: 8px; 
    }
    .marksheet-student-card { 
      background: #f8fafc; 
      border: 1px solid #cbd5e1; 
      border-radius: 5px; 
      padding: 6px 12px; 
      font-size: 11.5px; 
      line-height: 1.55; 
      color: #0f172a; 
    }
    .marksheet-student-card .info-row { 
      margin: 1px 0; 
    }
    .marksheet-subjects-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 8px 0; 
      font-size: 11.5px; 
      border: 1px solid #000; 
    }
    .marksheet-subjects-table th, .marksheet-subjects-table td { 
      border: 1px solid #000; 
      padding: 7px 6px; 
      text-align: center; 
      line-height: 1.35; 
    }
    .marksheet-subjects-table th { 
      background: #fff; 
      color: #000; 
      font-weight: 700; 
      font-size: 11.5px; 
      padding: 6.5px 6px;
    }
    .marksheet-subjects-table td.text-left { 
      text-align: left; 
      padding-left: 8px; 
      font-weight: 700; 
    }
    .transcript-grade-cell { 
      vertical-align: middle; 
      text-align: center; 
      background: #fff; 
    }
    .grade-letter { 
      font-size: 13px; 
      font-weight: 800; 
      color: #0b8050; 
      line-height: 1.15; 
    }
    .grade-gp { 
      font-size: 10px; 
      font-weight: 700; 
      color: #000; 
      margin-top: 1px; 
    }
    .transcript-summary-box { 
      display: grid; 
      grid-template-columns: repeat(6, 1fr); 
      gap: 5px; 
      background: #f8fafc; 
      border: 1px solid #cbd5e1; 
      border-radius: 5px; 
      padding: 6px 5px; 
      margin-top: 8px; 
      text-align: center; 
    }
    .transcript-summary-box .summary-label { 
      font-size: 10px; 
      color: #64748b; 
      font-weight: 600; 
      margin-bottom: 2px; 
    }
    .transcript-summary-box .summary-val { 
      font-size: 14.5px; 
      font-weight: 800; 
      color: #000; 
    }
    .transcript-summary-box .summary-val.green-text { 
      color: #0b8050; 
    }
    .transcript-summary-box .summary-val.status-text { 
      font-size: 14.5px; 
    }
    .transcript-bottom-content {
      margin-top: auto;
      padding-top: 10px;
    }
    .transcript-signatures-zone { 
      display: flex; 
      justify-content: space-between; 
      font-size: 11px; 
      color: #334155; 
      text-align: center; 
      margin-bottom: 4px;
    }
    .transcript-signatures-zone .sig-column { 
      min-width: 140px; 
    }
    .transcript-signatures-zone.four-columns .sig-column { 
      min-width: 105px; 
      flex: 1;
      padding: 0 4px;
    }
    .transcript-signatures-zone .sig-dots { 
      letter-spacing: 1px; 
      color: #94a3b8; 
      margin-bottom: 5px; 
    }
    .transcript-signatures-zone .sig-title { 
      font-weight: 600; 
      color: #1e293b; 
    }
    .transcript-footer-line { 
      display: flex; 
      justify-content: space-between; 
      font-size: 9px; 
      color: #64748b; 
      border-top: 1px dotted #cbd5e1; 
      padding-top: 4px; 
    }
    @media print {
      body { padding: 0; }
      .no-print-bar { display: none !important; }
      .official-marksheet-wrapper { 
        page-break-after: always !important; 
        break-after: page !important; 
        page-break-inside: avoid !important; 
        break-inside: avoid !important; 
        height: 284mm !important;
        min-height: 284mm !important;
        max-height: 284mm !important;
        overflow: hidden !important;
      }
      .official-marksheet-wrapper:last-child { page-break-after: auto !important; break-after: auto !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar" style="position:sticky;top:0;z-index:1000;background:#0f172a;color:#fff;padding:8px 14px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.2);margin-bottom:12px;">
    <div>
      <b>📄 ${J?`একাডেমিক ট্রান্সক্রিপ্ট / মার্কশিট`:`মার্কশিট ও প্রোগ্রেস রিপোর্ট`} — প্রিন্ট ও PDF প্রিভিউ (${o(t.length)} জন)</b>
      <span style="font-size:11px;opacity:0.9;margin-left:10px;">(📌 PDF হিসেবে ডাউনলোড করতে Destination-এ <b>"Save as PDF"</b> নির্বাচন করুন)</span>
    </div>
    <div style="display:flex;gap:8px;">
      <button type="button" style="background:#0284c7;color:#fff;border:none;padding:6px 14px;border-radius:5px;font-weight:700;cursor:pointer;font-size:12px;" onclick="window.print()">📥 PDF ডাউনলোড / সেভ করুন</button>
      <button type="button" style="background:#047857;color:#fff;border:none;padding:6px 14px;border-radius:5px;font-weight:700;cursor:pointer;font-size:12px;" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
      <button type="button" onclick="window.close()" style="background:#e2e8f0;color:#0f172a;border:none;padding:6px 14px;border-radius:5px;font-weight:700;cursor:pointer;font-size:12px;">✕ বন্ধ করুন</button>
    </div>
  </div>
  ${r}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  <\/script>
</body>
</html>`),n.document.close()},Ot=()=>{if(!$){G(`প্রিন্ট করার জন্য কোনো শিক্ষার্থী নির্বাচিত নেই।`,`error`);return}Dt([$])},kt=()=>{if(H===`all`)return Z;if(H===`passed`)return Z.filter(e=>e.result_status===`উত্তীর্ণ`||e.final_grade!==`F`);if(H===`failed`)return Z.filter(e=>e.result_status!==`উত্তীর্ণ`&&e.final_grade===`F`);if(H===`range`){let e=Number(me)||0,t=Number(ge)||999999;return Z.filter(n=>{let r=Number(n.roll_no)||0;return r>=e&&r<=t})}return Z},At=()=>{let e=kt();if(!e.length){alert(`নির্বাচিত শর্তে কোনো শিক্ষার্থী পাওয়া যায়নি।`);return}Dt(e)},jt=async()=>{if(window.confirm(`আপনি কি ঢাকা শিক্ষা বোর্ডের প্রমিত বিষয় ও নম্বর বণ্টন পুনরায় লোড করতে চান?`))try{await d(`/subjects/reset-dhaka-board`,{method:`POST`});let e=await d(`/subjects`);w(e),G(`ঢাকা শিক্ষা বোর্ডের প্রমিত বিষয় ও নম্বর বণ্টন সফলভাবে লোড হয়েছে! ✓`,`success`)}catch(e){G(`সিলেবাস লোড ব্যর্থ: `+e.message,`error`)}},Mt=async e=>{if(e.preventDefault(),!Ce.year||!Ce.year.trim()){G(`শিক্ষাবর্ষ উল্লেখ করুন (যেমন: 2026)`,`error`);return}try{xe?(await d(`/academic-years/${xe}`,{method:`PUT`,body:JSON.stringify(Ce)}),G(`শিক্ষাবর্ষ সফলভাবে আপডেট করা হয়েছে।`,`success`)):(await d(`/academic-years`,{method:`POST`,body:JSON.stringify(Ce)}),G(`নতুন শিক্ষাবর্ষ সফলভাবে সংরক্ষণ করা হয়েছে।`,`success`)),Se(null),we({year:``,title_bn:``,is_current:!1,status:`active`,remarks:``}),Pe()}catch(e){G(e.message||`শিক্ষাবর্ষ সংরক্ষণ ব্যর্থ`,`error`)}},Nt=e=>{Se(e.id||e.year),we({year:e.year||``,title_bn:e.title_bn||``,is_current:!!e.is_current,status:e.status||`active`,remarks:e.remarks||``})},Pt=async e=>{if(window.confirm(`আপনি কি নিশ্চিত যে "${e.title_bn||e.year}" শিক্ষাবর্ষটি মুছে ফেলতে চান?`))try{await d(`/academic-years/${e.id||e.year}`,{method:`DELETE`}),G(`শিক্ষাবর্ষটি সফলভাবে মুছে ফেলা হয়েছে।`,`success`),Pe()}catch(e){G(e.message||`শিক্ষাবর্ষ মুছতে ব্যর্থ`,`error`)}},Ft=async e=>{try{await d(`/academic-years/${e.id||e.year}`,{method:`PUT`,body:JSON.stringify({...e,is_current:!0,status:`active`})}),G(`"${e.title_bn||e.year}" শিক্ষাবর্ষকে সক্রিয় শিক্ষাবর্ষ হিসেবে নির্ধারণ করা হয়েছে।`,`success`),Pe()}catch(e){G(e.message||`সক্রিয়করণ ব্যর্থ`,`error`)}},It=async e=>{if(e.preventDefault(),!ke.name_bn||!ke.name_bn.trim()){G(`পরীক্ষার নাম (বাংলা) আবশ্যক`,`error`);return}try{if(Te)await d(`/exams/${Te}`,{method:`PUT`,body:JSON.stringify(ke)}),G(`পরীক্ষার তথ্য সফলভাবে আপডেট হয়েছে।`,`success`);else{let e=await d(`/exams`,{method:`POST`,body:JSON.stringify(ke)});G(`নতুন পরীক্ষা সফলভাবে তৈরি হয়েছে।`,`success`),e&&e.id&&j(e.id)}Ee(null),W({academic_year:O,name_bn:``,name_en:``,exam_type:`সাময়িক পরীক্ষা`,status:`active`,remarks:``}),await Pe()}catch(e){G(e.message||`পরীক্ষা সংরক্ষণ ব্যর্থ`,`error`)}},Lt=e=>{Ee(e.id),W({academic_year:String(e.academic_year||O),name_bn:e.name_bn||``,name_en:e.name_en||``,exam_type:e.exam_type||`সাময়িক পরীক্ষা`,status:e.status||`active`,remarks:e.remarks||``})},Rt=async e=>{if(window.confirm(`আপনি কি নিশ্চিত যে "${e.name_bn}" পরীক্ষাটি মুছে ফেলতে চান?`))try{await d(`/exams/${e.id}`,{method:`DELETE`}),G(`পরীক্ষাটি সফলভাবে মুছে ফেলা হয়েছে।`,`success`),Pe()}catch(e){G(e.message||`পরীক্ষা মুছতে ব্যর্থ`,`error`)}},zt=e=>{j(e),b(`marks`)};return(0,u.jsxs)(`div`,{className:`result-panel exam-modern-wrapper`,children:[(0,u.jsxs)(`div`,{className:`exam-kpi-banner`,children:[(0,u.jsxs)(`div`,{className:`exam-kpi-card highlight-card`,children:[(0,u.jsx)(`div`,{className:`kpi-icon`,children:`🗓️`}),(0,u.jsxs)(`div`,{className:`kpi-body`,children:[(0,u.jsx)(`span`,{className:`kpi-label`,children:`বর্তমান শিক্ষাবর্ষ`}),(0,u.jsx)(`div`,{className:`kpi-val`,children:Fe?Fe.title_bn:`২০২৬ শিক্ষাবর্ষ`}),(0,u.jsx)(`span`,{className:`kpi-badge badge-active`,children:`সক্রিয় চলমান সেশন`})]})]}),(0,u.jsxs)(`div`,{className:`exam-kpi-card`,children:[(0,u.jsx)(`div`,{className:`kpi-icon`,children:`📝`}),(0,u.jsxs)(`div`,{className:`kpi-body`,children:[(0,u.jsx)(`span`,{className:`kpi-label`,children:`নির্ধারিত পরীক্ষা`}),(0,u.jsxs)(`div`,{className:`kpi-val`,children:[o(C.length),` টি`]}),(0,u.jsxs)(`span`,{className:`kpi-sub`,children:[o(Le.length),`টি (`,o(O),` শিক্ষাবর্ষ)`]})]})]}),(0,u.jsxs)(`div`,{className:`exam-kpi-card`,children:[(0,u.jsx)(`div`,{className:`kpi-icon`,children:`🎯`}),(0,u.jsxs)(`div`,{className:`kpi-body`,children:[(0,u.jsx)(`span`,{className:`kpi-label`,children:`চলমান পরীক্ষা`}),(0,u.jsx)(`div`,{className:`kpi-val exam-name-truncate`,children:q?q.name_bn:`পরীক্ষা নির্বাচন করুন`}),(0,u.jsx)(`span`,{className:`kpi-sub`,children:q?.exam_type||`অভ্যন্তরীণ পরীক্ষা`})]})]}),(0,u.jsxs)(`div`,{className:`exam-kpi-card`,children:[(0,u.jsx)(`div`,{className:`kpi-icon`,children:`📊`}),(0,u.jsxs)(`div`,{className:`kpi-body`,children:[(0,u.jsx)(`span`,{className:`kpi-label`,children:`শ্রেণি স্তর`}),(0,u.jsx)(`div`,{className:`kpi-val`,children:K?`৯ম-১০ম শ্রেণি`:`৬ষ্ঠ-৮ম শ্রেণি`}),(0,u.jsx)(`span`,{className:`kpi-badge badge-pub`,children:K?`বিভাগভিত্তিক`:`সাধারণ প্রমিত`})]})]})]}),E&&(0,u.jsxs)(`div`,{className:`exam-alert-box alert-${re}`,children:[(0,u.jsx)(`span`,{className:`alert-icon`,children:re===`success`?`✓`:re===`error`?`⚠`:`ℹ`}),(0,u.jsx)(`span`,{className:`alert-text`,children:E})]}),(0,u.jsx)(`div`,{className:`exam-tab-bar`,children:(()=>{let e=[[`academic_year`,`🗓️ ১. একাডেমিক ইয়ার`],[`exam_names`,`📝 ২. পরীক্ষার নাম`],[`subjects`,`📚 ৩. বিষয় ও নম্বর বণ্টন`],[`marks`,`✍️ ৪. বিষয়ভিত্তিক মার্ক এন্ট্রি`],[`grading`,`🎯 ৫. গ্রেডিং পলিসি`],[`processing`,`⚙️ ৬. ফলাফল প্রসেসিং`],[`tabulation`,`📋 ৭. ট্যাবুলেশন শিট`],[`marksheet`,`📄 ৮. মার্কশিট ও প্রোগ্রেস রিপোর্ট`],[`merit`,`🏆 ৯. মেধা তালিকা`],[`failed_list`,`⚠️ ১০. অকৃতকার্য তালিকা`],[`analysis`,`📊 ১১. ফলাফল বিশ্লেষণ`],[`promotion`,`🎓 ১২. শিক্ষার্থী প্রমোশন`]],t=_?e.filter(([e])=>e===`marks`):a===`co_admin`?e.filter(([e])=>[`marks`,`tabulation`,`marksheet`,`merit`,`failed_list`].includes(e)):e;if(t.length<=4)return(0,u.jsx)(`div`,{className:`exam-tab-row`,children:t.map(([e,t])=>(0,u.jsx)(`button`,{type:`button`,className:`exam-tab-btn ${y===e?`active`:``}`,onClick:()=>b(e),children:t},e))});let n=Math.min(6,Math.ceil(t.length/2)),r=t.slice(0,n),i=t.slice(n);return(0,u.jsxs)(`div`,{className:`exam-tab-two-rows`,children:[(0,u.jsx)(`div`,{className:`exam-tab-row`,children:r.map(([e,t])=>(0,u.jsx)(`button`,{type:`button`,className:`exam-tab-btn ${y===e?`active`:``}`,onClick:()=>b(e),children:t},e))}),(0,u.jsx)(`div`,{className:`exam-tab-row`,children:i.map(([e,t])=>(0,u.jsx)(`button`,{type:`button`,className:`exam-tab-btn ${y===e?`active`:``}`,onClick:()=>b(e),children:t},e))})]})})()}),[`subjects`,`marks`,`processing`,`merit`,`failed_list`,`tabulation`,`marksheet`,`analysis`].includes(y)&&(0,u.jsxs)(`div`,{className:`exam-context-toolbar`,children:[(0,u.jsxs)(`div`,{className:`toolbar-group`,children:[(0,u.jsx)(`label`,{children:`শিক্ষাবর্ষ:`}),(0,u.jsx)(`select`,{value:O,onChange:e=>{k(e.target.value),W(t=>({...t,academic_year:e.target.value}))},children:x.map(e=>(0,u.jsxs)(`option`,{value:e.year,children:[e.title_bn||e.year,` `,e.is_current?` ★ (সক্রিয়)`:``]},e.id||e.year))})]}),(0,u.jsxs)(`div`,{className:`toolbar-group`,children:[(0,u.jsx)(`label`,{children:`পরীক্ষা:`}),(0,u.jsx)(`select`,{value:A,onChange:e=>j(e.target.value),disabled:!Le.length,children:Le.length===0?(0,u.jsx)(`option`,{value:``,children:`কোনো পরীক্ষা সেটআপ নেই`}):Le.map(e=>(0,u.jsxs)(`option`,{value:e.id,children:[e.name_bn,` `,e.status===`published`?`✓ (প্রকাশিত)`:``]},e.id))})]}),(0,u.jsxs)(`div`,{className:`toolbar-group`,children:[(0,u.jsx)(`label`,{children:`শ্রেণি:`}),(0,u.jsx)(`select`,{value:M,onChange:e=>ae(e.target.value),children:m.map(e=>(0,u.jsxs)(`option`,{value:e,children:[`শ্রেণি `,o(e)]},e))})]}),K&&(0,u.jsxs)(`div`,{className:`toolbar-group`,children:[(0,u.jsx)(`label`,{children:`বিভাগ/গ্রুপ:`}),(0,u.jsxs)(`select`,{value:N,onChange:e=>P(e.target.value),children:[(0,u.jsx)(`option`,{value:`all`,children:`সকল বিভাগ (All)`}),(0,u.jsx)(`option`,{value:`বিজ্ঞান`,children:`বিজ্ঞান বিভাগ (Science)`}),(0,u.jsx)(`option`,{value:`মানবিক`,children:`মানবিক বিভাগ (Humanities)`}),(0,u.jsx)(`option`,{value:`ব্যবসায় শিক্ষা`,children:`ব্যবসায় শিক্ষা (Commerce)`})]})]}),y===`marks`&&(0,u.jsxs)(`div`,{className:`toolbar-group`,children:[(0,u.jsx)(`label`,{children:`বিষয়:`}),(0,u.jsx)(`select`,{value:oe,onChange:e=>F(e.target.value),children:Y.map(e=>(0,u.jsxs)(`option`,{value:e.id,children:[`[`,e.code,`] `,e.name_bn,` `,e.is_optional?` (৪র্থ বিষয়)`:``]},e.id))})]}),(0,u.jsxs)(`div`,{className:`toolbar-actions`,children:[y===`marks`&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:Ke,children:`🔄 লোড`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,onClick:Ze,children:`💾 সংরক্ষণ`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:Qe,title:`দ্রুত ডেমো নম্বর পূরণ করুন`,children:`🎲 ডেমো ফিল`})]}),y===`processing`&&(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,onClick:ct,children:`🧮 Result Process চালান`}),y===`failed_list`?(0,u.jsxs)(`div`,{style:{display:`inline-flex`,gap:`6px`},children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#b91c1c`,color:`#fff`,borderColor:`#b91c1c`,fontWeight:700},onClick:rt,title:`অকৃতকার্য শিক্ষার্থীদের তালিকা PDF ডাউনলোড করুন`,children:`📥 অকৃতকার্য PDF`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:rt,title:`অকৃতকার্য শিক্ষার্থীদের তালিকা প্রিন্ট করুন`,children:`🖨️ প্রিন্ট`})]}):y===`tabulation`?(0,u.jsxs)(`div`,{style:{display:`inline-flex`,gap:`6px`},children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:700},onClick:nt,title:`ট্যাবুলেশন শিট PDF ডাউনলোড করুন (Legal Landscape)`,children:`📥 ট্যাবুলেশন PDF`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#047857`,color:`#fff`,borderColor:`#047857`,fontWeight:700},onClick:nt,title:`Legal Landscape (লিগ্যাল পেজ ল্যান্ডস্কেপ) সাইজে প্রিন্ট করুন`,children:`🖨️ প্রিন্ট শিট`})]}):y===`merit`?(0,u.jsxs)(`div`,{style:{display:`inline-flex`,gap:`6px`},children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:700},onClick:at,title:`মেধা তালিকা PDF ডাউনলোড করুন`,children:`📥 মেধা তালিকা PDF`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:at,title:`অফিশিয়াল মেধা তালিকা প্রিন্ট করুন`,children:`🖨️ প্রিন্ট`})]}):y===`marksheet`?(0,u.jsxs)(`div`,{style:{display:`inline-flex`,gap:`6px`},children:[(0,u.jsxs)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:700},onClick:Ot,title:`নির্বাচিত শিক্ষার্থীর ${Ue} PDF ডাউনলোড করুন`,children:[`📥 `,J?`ট্রান্সক্রিপ্ট PDF`:`প্রোগ্রেস PDF`]}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:Ot,title:`${Ue} প্রিন্ট করুন`,children:`🖨️ প্রিন্ট`})]}):null]})]}),y===`academic_year`&&(0,u.jsxs)(`div`,{className:`exam-section-grid`,children:[(0,u.jsxs)(`div`,{className:`exam-card-form`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`সেটআপ পর্ব - ১`}),(0,u.jsx)(`h3`,{children:xe?`✏️ শিক্ষাবর্ষ সম্পাদনা`:`➕ নতুন শিক্ষাবর্ষ সেটআপ`})]}),xe&&(0,u.jsx)(`button`,{type:`button`,className:`btn-text-cancel`,onClick:()=>{Se(null),we({year:``,title_bn:``,is_current:!1,status:`active`,remarks:``})},children:`বাতিল করুন`})]}),(0,u.jsx)(`p`,{className:`card-desc`,children:`বিদ্যালয়ের বিভিন্ন শিক্ষাবর্ষ নির্ধারণ করুন। নির্ধারিত শিক্ষাবর্ষের অধীনেই বিভিন্ন পরীক্ষা এবং মার্ক এন্ট্রি পরিচালিত হবে।`}),!xe&&(0,u.jsxs)(`div`,{className:`preset-chip-shelf`,children:[(0,u.jsx)(`span`,{className:`preset-label`,children:`দ্রুত প্রিসেট:`}),g.map(e=>(0,u.jsxs)(`button`,{type:`button`,className:`preset-chip`,onClick:()=>{we({year:e.year,title_bn:e.title_bn,is_current:e.is_current,status:e.status,remarks:e.remarks})},children:[`+ `,e.title_bn]},e.year))]}),(0,u.jsxs)(`form`,{onSubmit:Mt,className:`exam-form-body`,children:[(0,u.jsxs)(`div`,{className:`form-group-row`,children:[(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`শিক্ষাবর্ষ (বছর) *`}),(0,u.jsx)(`input`,{type:`number`,placeholder:`যেমন: 2026`,value:Ce.year,onChange:e=>{let t=e.target.value;we(e=>({...e,year:t,title_bn:t?`${o(t)} শিক্ষাবর্ষ`:``}))},required:!0})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`শিরোনাম (বাংলা) *`}),(0,u.jsx)(`input`,{type:`text`,placeholder:`যেমন: ২০২৬ শিক্ষাবর্ষ`,value:Ce.title_bn,onChange:e=>we(t=>({...t,title_bn:e.target.value})),required:!0})]})]}),(0,u.jsxs)(`div`,{className:`form-group-row`,children:[(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`অবস্থা (Status)`}),(0,u.jsxs)(`select`,{value:Ce.status,onChange:e=>we(t=>({...t,status:e.target.value})),children:[(0,u.jsx)(`option`,{value:`active`,children:`🟢 সক্রিয় (Active)`}),(0,u.jsx)(`option`,{value:`upcoming`,children:`🟡 আসন্ন (Upcoming)`}),(0,u.jsx)(`option`,{value:`completed`,children:`⚪ সম্পন্ন/আর্কাইভ (Completed)`})]})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`প্রধান সক্রিয় শিক্ষাবর্ষ হিসেবে নির্ধারণ`}),(0,u.jsxs)(`div`,{className:`checkbox-toggle-wrap`,children:[(0,u.jsx)(`input`,{type:`checkbox`,id:`isCurrentYear`,checked:Ce.is_current,onChange:e=>we(t=>({...t,is_current:e.target.checked}))}),(0,u.jsx)(`label`,{htmlFor:`isCurrentYear`,className:`checkbox-label-text`,children:`এটি বিদ্যালয়ের বর্তমান চলমান প্রধান শিক্ষাবর্ষ`})]})]})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`মন্তব্য / বিবরণ`}),(0,u.jsx)(`input`,{type:`text`,placeholder:`যেমন: চলমান শিক্ষাবর্ষ`,value:Ce.remarks,onChange:e=>we(t=>({...t,remarks:e.target.value}))})]}),(0,u.jsx)(`button`,{type:`submit`,className:`btn-modern-submit`,children:xe?`💾 শিক্ষাবর্ষ আপডেট করুন`:`➕ শিক্ষাবর্ষ সংরক্ষণ করুন`})]})]}),(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`তালিকা`}),(0,u.jsx)(`h3`,{children:`নির্ধারিত শিক্ষাবর্ষের তালিকা`})]}),(0,u.jsxs)(`span`,{className:`table-count-badge`,children:[`মোট: `,o(x.length),` টি`]})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{children:`শিক্ষাবর্ষ`}),(0,u.jsx)(`th`,{children:`বাংলা শিরোনাম`}),(0,u.jsx)(`th`,{children:`স্ট্যাটাস`}),(0,u.jsx)(`th`,{children:`পরীক্ষার সংখ্যা`}),(0,u.jsx)(`th`,{style:{textAlign:`right`},children:`কাজ`})]})}),(0,u.jsx)(`tbody`,{children:x.map(e=>{let t=C.filter(t=>String(t.academic_year)===String(e.year)).length;return(0,u.jsxs)(`tr`,{className:e.is_current?`active-year-row`:``,children:[(0,u.jsxs)(`td`,{children:[(0,u.jsx)(`b`,{children:o(e.year)}),e.is_current&&(0,u.jsx)(`span`,{className:`active-star-badge`,title:`সক্রিয় চলমান শিক্ষাবর্ষ`,children:`★ প্রধান`})]}),(0,u.jsx)(`td`,{children:e.title_bn}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`status-pill ${e.status===`active`?`status-active`:`status-completed`}`,children:e.status===`active`?`সক্রিয়`:e.status===`upcoming`?`আসন্ন`:`আর্কাইভ`})}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`span`,{className:`exam-count-chip`,children:[o(t),` টি পরীক্ষা`]})}),(0,u.jsx)(`td`,{style:{textAlign:`right`},children:(0,u.jsxs)(`div`,{className:`table-action-group`,children:[!e.is_current&&(0,u.jsx)(`button`,{type:`button`,className:`btn-action-icon activate`,onClick:()=>Ft(e),title:`চলমান শিক্ষাবর্ষ হিসেবে সেট করুন`,children:`★`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-action-icon edit`,onClick:()=>Nt(e),title:`সম্পাদনা`,children:`✏️`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-action-icon delete`,onClick:()=>Pt(e),title:`মুছুন`,children:`🗑️`})]})})]},e.id||e.year)})})]})})]})]}),y===`exam_names`&&(0,u.jsxs)(`div`,{className:`exam-section-grid`,children:[(0,u.jsxs)(`div`,{className:`exam-card-form`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`সেটআপ পর্ব - ২`}),(0,u.jsx)(`h3`,{children:Te?`✏️ পরীক্ষার নাম সম্পাদনা`:`➕ পরীক্ষার নাম স্থাপন`})]}),Te&&(0,u.jsx)(`button`,{type:`button`,className:`btn-text-cancel`,onClick:()=>{Ee(null),W({academic_year:O,name_bn:``,name_en:``,exam_type:`সাময়িক পরীক্ষা`,status:`active`,remarks:``})},children:`বাতিল করুন`})]}),(0,u.jsxs)(`p`,{className:`card-desc`,children:[`মার্ক এন্ট্রির জন্য বিভিন্ন পরীক্ষার নাম ও শিক্ষাবর্ষ নির্ধারণ করুন। `,(0,u.jsx)(`i`,{children:`(রুটিন সংক্রান্ত নয়, তাই এখানে তারিখের কোনো ফিল্ড রাখা হয়নি।)`})]}),!Te&&(0,u.jsxs)(`div`,{className:`preset-chip-shelf`,children:[(0,u.jsx)(`span`,{className:`preset-label`,children:`প্রমিত প্রিসেট:`}),h.map(e=>(0,u.jsxs)(`button`,{type:`button`,className:`preset-chip`,onClick:()=>{W(t=>({...t,name_bn:e.name_bn,name_en:e.name_en,exam_type:e.exam_type}))},children:[`+ `,e.name_bn]},e.name_bn))]}),(0,u.jsxs)(`form`,{onSubmit:It,className:`exam-form-body`,children:[(0,u.jsxs)(`div`,{className:`form-group-row`,children:[(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`শিক্ষাবর্ষ *`}),(0,u.jsx)(`select`,{value:ke.academic_year,onChange:e=>W(t=>({...t,academic_year:e.target.value})),required:!0,children:x.map(e=>(0,u.jsxs)(`option`,{value:e.year,children:[e.title_bn||e.year,` `,e.is_current?` ★`:``]},e.id||e.year))})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`পরীক্ষার ধরন (Category) *`}),(0,u.jsxs)(`select`,{value:ke.exam_type,onChange:e=>W(t=>({...t,exam_type:e.target.value})),children:[(0,u.jsx)(`option`,{value:`সাময়িক পরীক্ষা`,children:`সাময়িক পরীক্ষা (Terminal)`}),(0,u.jsx)(`option`,{value:`অর্ধবার্ষিক পরীক্ষা`,children:`অর্ধবার্ষিক পরীক্ষা (Half Yearly)`}),(0,u.jsx)(`option`,{value:`বার্ষিক পরীক্ষা`,children:`বার্ষিক পরীক্ষা (Annual)`}),(0,u.jsx)(`option`,{value:`প্রাক-নির্বাচনী পরীক্ষা`,children:`প্রাক-নির্বাচনী পরীক্ষা (Pre-Test)`}),(0,u.jsx)(`option`,{value:`নির্বাচনী পরীক্ষা (Test)`,children:`নির্বাচনী পরীক্ষা (Test - SSC)`}),(0,u.jsx)(`option`,{value:`মডেল টেস্ট / ক্লাস টেস্ট`,children:`মডেল টেস্ট / ক্লাস টেস্ট`})]})]})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`পরীক্ষার নাম (বাংলা) *`}),(0,u.jsx)(`input`,{type:`text`,placeholder:`যেমন: ১ম সাময়িক পরীক্ষা ২০২৬ বা নির্বাচনী পরীক্ষা`,value:ke.name_bn,onChange:e=>W(t=>({...t,name_bn:e.target.value})),required:!0})]}),(0,u.jsxs)(`div`,{className:`form-group-row`,children:[(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`পরীক্ষার নাম (English - ঐচ্ছিক)`}),(0,u.jsx)(`input`,{type:`text`,placeholder:`e.g. 1st Terminal Examination`,value:ke.name_en,onChange:e=>W(t=>({...t,name_en:e.target.value}))})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`এন্ট্রি অবস্থা (Status)`}),(0,u.jsxs)(`select`,{value:ke.status,onChange:e=>W(t=>({...t,status:e.target.value})),children:[(0,u.jsx)(`option`,{value:`active`,children:`🟢 সক্রিয় (নম্বর এন্ট্রি উন্মুক্ত)`}),(0,u.jsx)(`option`,{value:`draft`,children:`🟡 খসড়া / প্রস্তুতি চলছে`}),(0,u.jsx)(`option`,{value:`published`,children:`🟣 ফলাফল প্রকাশিত ও সংরক্ষিত`})]})]})]}),(0,u.jsxs)(`div`,{className:`form-field-unit`,children:[(0,u.jsx)(`label`,{children:`মন্তব্য / অতিরিক্ত তথ্য`}),(0,u.jsx)(`input`,{type:`text`,placeholder:`যেমন: সকল শ্রেণির লিখিত ও MCQ নম্বর এন্ট্রি`,value:ke.remarks,onChange:e=>W(t=>({...t,remarks:e.target.value}))})]}),(0,u.jsx)(`button`,{type:`submit`,className:`btn-modern-submit`,children:Te?`💾 পরীক্ষার তথ্য আপডেট করুন`:`➕ পরীক্ষার নাম সংরক্ষণ করুন`})]})]}),(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`পরীক্ষার তালিকা`}),(0,u.jsx)(`h3`,{children:`স্থাপিত পরীক্ষার নামসমূহ`})]}),(0,u.jsxs)(`div`,{className:`filter-shelf-mini`,children:[(0,u.jsx)(`label`,{children:`শিক্ষাবর্ষ ফিল্টার:`}),(0,u.jsxs)(`select`,{value:De,onChange:e=>Oe(e.target.value),children:[(0,u.jsx)(`option`,{value:`all`,children:`সব শিক্ষাবর্ষ`}),x.map(e=>(0,u.jsx)(`option`,{value:e.year,children:e.title_bn||e.year},e.id||e.year))]})]})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{children:`শিক্ষাবর্ষ`}),(0,u.jsx)(`th`,{children:`পরীক্ষার নাম`}),(0,u.jsx)(`th`,{children:`ধরন`}),(0,u.jsx)(`th`,{children:`অবস্থা`}),(0,u.jsx)(`th`,{style:{textAlign:`right`},children:`কাজ`})]})}),(0,u.jsxs)(`tbody`,{children:[Ie.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`code-pill`,children:o(e.academic_year)})}),(0,u.jsxs)(`td`,{children:[(0,u.jsx)(`b`,{children:e.name_bn}),e.name_en&&(0,u.jsx)(`div`,{className:`sub-text-en`,children:e.name_en})]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`type-badge`,children:e.exam_type||`অভ্যন্তরীণ`})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`status-pill ${e.status===`active`?`status-active`:e.status===`published`?`status-pub`:`status-completed`}`,children:e.status===`active`?`🟢 এন্ট্রি উন্মুক্ত`:e.status===`published`?`🟣 প্রকাশিত`:`🟡 প্রস্তুত`})}),(0,u.jsx)(`td`,{style:{textAlign:`right`},children:(0,u.jsxs)(`div`,{className:`table-action-group`,children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-action-jump-marks`,onClick:()=>zt(e.id),title:`এই পরীক্ষায় নম্বর এন্ট্রি করুন`,children:`✍️ মার্ক এন্ট্রি ➜`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-action-icon edit`,onClick:()=>Lt(e),title:`সম্পাদনা`,children:`✏️`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-action-icon delete`,onClick:()=>Rt(e),title:`মুছুন`,children:`🗑️`})]})})]},e.id)),!Ie.length&&(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`5`,className:`empty-table-cell`,children:`এই শিক্ষাবর্ষের জন্য কোনো পরীক্ষা তৈরি করা হয়নি।`})})]})]})})]})]}),y===`subjects`&&(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`board-pattern-banner`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`pattern-badge-pill`,children:K?`🏛️ ঢাকা শিক্ষা বোর্ড প্রমিত কাঠামো (৯ম ও ১০ম শ্রেণি)`:`📋 ঢাকা শিক্ষা বোর্ড প্রমিত কাঠামো (৬ষ্ঠ - ৮ম শ্রেণি)`}),(0,u.jsx)(`p`,{className:`pattern-desc`,children:K?`৯ম ও ১০ম শ্রেণি: আবশ্যিক বিষয়সমূহ + বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা বিভাগভিত্তিক ৩টি মূল বিষয় + ৪র্থ বিষয় (ঐচ্ছিক)। পূর্ণমান ১৩০০।`:`৬ষ্ঠ থেকে ৮ম শ্রেণি: বাংলা, ইংরেজি, গণিত, বিজ্ঞান, বাবিপ, ধর্ম, আইসিটি এবং সহায়ক বিষয়। লিখিত (CQ), MCQ ও ব্যবহারিকে পৃথক পাস প্রযোজ্য।`})]}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:jt,title:`ঢাকা শিক্ষা বোর্ডের প্রমিত বিষয় ও নম্বর বণ্টন পুনরায় লোড করুন`,children:`🏛️ বোর্ডের সিলেবাস রিসেট / লোড`})]}),(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`সিলেবাস ও বিষয় কাঠামো`}),(0,u.jsxs)(`h3`,{children:[`📚 শ্রেণি `,o(M),` — বিষয় ও নম্বর বণ্টন`,K&&N!==`all`?` (${N})`:``]})]}),(0,u.jsxs)(`span`,{className:`table-count-badge`,children:[`মোট বিষয়: `,o(Y.length),` টি`]})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{style:{width:`80px`},children:`বিষয় কোড`}),(0,u.jsx)(`th`,{children:`বিষয়ের নাম`}),(0,u.jsx)(`th`,{children:`বিভাগ / ধরন`}),(0,u.jsx)(`th`,{children:`পূর্ণমান`}),(0,u.jsx)(`th`,{children:`লিখিত / CQ (পাস)`}),(0,u.jsx)(`th`,{children:`MCQ (পাস)`}),(0,u.jsx)(`th`,{children:`ব্যবহারিক (পাস)`}),(0,u.jsx)(`th`,{children:`সর্বমোট পাস`}),(0,u.jsx)(`th`,{children:`৪র্থ বিষয় (ঐচ্ছিক)`})]})}),(0,u.jsxs)(`tbody`,{children:[Y.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`code-pill`,children:(0,u.jsx)(`b`,{children:e.code})})}),(0,u.jsxs)(`td`,{children:[(0,u.jsx)(`b`,{children:e.name_bn}),e.name_en&&(0,u.jsx)(`div`,{className:`sub-text-en`,children:e.name_en})]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:e.department===`বিজ্ঞান`?`sub-tag-sci`:e.department===`মানবিক`?`sub-tag-hum`:e.department===`ব্যবসায় শিক্ষা`?`sub-tag-bus`:`sub-tag-compulsory`,children:e.department||`সাধারণ`})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:o(e.full_marks||100)})}),(0,u.jsx)(`td`,{children:e.written_max>0?(0,u.jsxs)(`span`,{children:[o(e.written_max),` `,(0,u.jsxs)(`small`,{className:`text-muted`,children:[`(`,o(e.written_pass||23),`)`]})]}):`—`}),(0,u.jsx)(`td`,{children:e.mcq_max>0?(0,u.jsxs)(`span`,{children:[o(e.mcq_max),` `,(0,u.jsxs)(`small`,{className:`text-muted`,children:[`(`,o(e.mcq_pass||10),`)`]})]}):`—`}),(0,u.jsx)(`td`,{children:e.practical_max>0?(0,u.jsxs)(`span`,{children:[o(e.practical_max),` `,(0,u.jsxs)(`small`,{className:`text-muted`,children:[`(`,o(e.practical_pass||8),`)`]})]}):`—`}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{className:`tab-pass-cell`,children:o(e.pass_marks||33)})}),(0,u.jsx)(`td`,{children:e.is_optional?(0,u.jsx)(`span`,{className:`sub-tag-opt`,children:`★ ৪র্থ বিষয়`}):(0,u.jsx)(`span`,{className:`text-muted`,children:`আবশ্যিক/মূল`})})]},e.id||e.code)),!Y.length&&(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`9`,className:`empty-table-cell`,children:`এই শ্রেণি ও বিভাগের জন্য কোনো বিষয় পাওয়া যায়নি। উপরের "বোর্ডের সিলেবাস রিসেট" বাটনে ক্লিক করুন।`})})]})]})})]}),y===`marks`&&(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`নম্বর এন্ট্রি কনসোল`}),(0,u.jsxs)(`h3`,{children:[`✍️ `,q?q.name_bn:`পরীক্ষা`,` — শ্রেণি `,o(M),`: [`,X?.code,`] `,X?.name_bn,K&&N&&N!==`all`&&N!==`সকল বিভাগ`?` (${N} বিভাগ)`:``,(0,u.jsxs)(`span`,{style:{fontSize:`13px`,fontWeight:600,color:`#0369a1`,background:`#e0f2fe`,padding:`3px 9px`,borderRadius:`12px`,marginLeft:`10px`},children:[o(qe.length),` জন শিক্ষার্থী`]})]})]}),(0,u.jsxs)(`div`,{className:`table-action-group`,children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:Ke,children:`🔄 তালিকা রিফ্রেশ`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:600},onClick:et,title:`বর্তমান বিষয়ের শিক্ষার্থীদের নম্বর এন্ট্রি শিট CSV ফাইল হিসেবে ডাউনলোড করুন (Excel Compatible)`,children:`📥 CSV Download`}),(0,u.jsxs)(`label`,{className:`btn-modern-action`,style:{background:`#059669`,color:`#fff`,borderColor:`#059669`,fontWeight:600,cursor:`pointer`,display:`inline-flex`,alignItems:`center`,gap:`5px`},title:`এক্সেলে পূরণকৃত মার্কস CSV ফাইল আপলোড করে এক ক্লিকে সকল নম্বর যুক্ত করুন`,children:[`📤 CSV Upload`,(0,u.jsx)(`input`,{type:`file`,accept:`.csv,text/csv`,style:{display:`none`},onChange:st})]}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:Qe,title:`বর্তমান নির্বাচিত বিষয়ের নমুনা নম্বর পূরণ`,children:`🎲 ডেমো ফিল`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,onClick:Ze,children:`💾 সব নম্বর সংরক্ষণ`})]})]}),X&&(0,u.jsxs)(`div`,{className:`subject-meta-strip`,children:[(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`পূর্ণমান:`}),` `,X.full_marks]}),X.written_max>0&&(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`লিখিত/CQ:`}),` সর্বোচ্চ `,X.written_max,` (পাস: `,X.written_pass||23,`)`]}),X.mcq_max>0&&(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`MCQ:`}),` সর্বোচ্চ `,X.mcq_max,` (পাস: `,X.mcq_pass||10,`)`]}),X.practical_max>0&&(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`ব্যবহারিক:`}),` সর্বোচ্চ `,X.practical_max,` (পাস: `,X.practical_pass||8,`)`]}),(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`মোট পাস:`}),` `,X.pass_marks||33]})]}),(0,u.jsxs)(`div`,{className:`marks-quick-tip-banner`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`8px`},children:[(0,u.jsxs)(`span`,{children:[`⚡ `,(0,u.jsx)(`b`,{children:`সরাসরি দ্রুত মার্ক এন্ট্রি:`}),` সরাসরি কীবোর্ডে নম্বর লিখুন (Enter বা ↓ চাপলে পরের ঘরে যাবে)। অথবা `,(0,u.jsx)(`b`,{children:`CSV Download`}),` করে অফলাইনে এক্সেলে নম্বর বসিয়ে `,(0,u.jsx)(`b`,{children:`CSV Upload`}),` করতে পারেন।`]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:`6px`,alignItems:`center`},children:[(0,u.jsx)(`button`,{type:`button`,onClick:et,style:{background:`#0284c7`,color:`#fff`,border:`none`,padding:`5px 12px`,borderRadius:`6px`,fontSize:`12px`,fontWeight:700,cursor:`pointer`,display:`inline-flex`,alignItems:`center`,gap:`4px`},title:`বর্তমান বিষয়ের CSV শিট ডাউনলোড`,children:`📥 CSV Download`}),(0,u.jsxs)(`label`,{style:{background:`#059669`,color:`#fff`,border:`none`,padding:`5px 12px`,borderRadius:`6px`,fontSize:`12px`,fontWeight:700,cursor:`pointer`,display:`inline-flex`,alignItems:`center`,gap:`4px`},title:`পূরণকৃত CSV শিট আপলোড`,children:[`📤 CSV Upload`,(0,u.jsx)(`input`,{type:`file`,accept:`.csv,text/csv`,style:{display:`none`},onChange:st})]})]})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table marks-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{style:{width:`60px`},children:`রোল`}),(0,u.jsx)(`th`,{children:`Student ID`}),(0,u.jsx)(`th`,{children:`শিক্ষার্থীর নাম`}),(0,u.jsx)(`th`,{children:`বিভাগ/শাখা`}),(0,u.jsx)(`th`,{style:{width:`95px`},children:`লিখিত / CQ`}),(0,u.jsx)(`th`,{style:{width:`95px`},children:`MCQ`}),(0,u.jsx)(`th`,{style:{width:`95px`},children:`ব্যবহারিক`}),(0,u.jsx)(`th`,{style:{width:`90px`},children:`মোট`}),(0,u.jsx)(`th`,{style:{width:`90px`},children:`গ্রেড (GP)`}),(0,u.jsx)(`th`,{style:{width:`70px`,textAlign:`center`},children:`অনুপস্থিত`}),(0,u.jsx)(`th`,{children:`মন্তব্য`})]})}),(0,u.jsxs)(`tbody`,{children:[qe.map((e,n)=>{let r=t(X,e),i=e.student_id||e.student_code||n;return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`roll-pill`,children:o(e.roll_no||`—`)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`code-pill`,children:e.student_code||`—`})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.name_bn})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`sub-tag-compulsory`,children:e.department})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`input`,{id:`roster-mark-written-${n}`,type:`text`,inputMode:`decimal`,className:`mark-input-box`,autoComplete:`off`,autoCorrect:`off`,spellCheck:`false`,disabled:e.absent||X?.written_max===0,placeholder:X?.written_max?`সর্বোচ্চ ${o(X.written_max)}`:`—`,value:e.written,onChange:e=>Ye(i,`written`,e.target.value,X?.written_max),onFocus:e=>e.target.select(),onKeyDown:e=>Xe(e,n,`written`)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`input`,{id:`roster-mark-mcq-${n}`,type:`text`,inputMode:`decimal`,className:`mark-input-box`,autoComplete:`off`,autoCorrect:`off`,spellCheck:`false`,disabled:e.absent||X?.mcq_max===0,placeholder:X?.mcq_max?`সর্বোচ্চ ${o(X.mcq_max)}`:`—`,value:e.mcq,onChange:e=>Ye(i,`mcq`,e.target.value,X?.mcq_max),onFocus:e=>e.target.select(),onKeyDown:e=>Xe(e,n,`mcq`)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`input`,{id:`roster-mark-practical-${n}`,type:`text`,inputMode:`decimal`,className:`mark-input-box`,autoComplete:`off`,autoCorrect:`off`,spellCheck:`false`,disabled:e.absent||X?.practical_max===0,placeholder:X?.practical_max?`সর্বোচ্চ ${o(X.practical_max)}`:`—`,value:e.practical,onChange:e=>Ye(i,`practical`,e.target.value,X?.practical_max),onFocus:e=>e.target.select(),onKeyDown:e=>Xe(e,n,`practical`)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{className:`mark-total-display ${e.absent?`absent`:``}`,children:e.absent?`Abs`:r.total})}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`span`,{className:`grade-pill ${r.is_pass?`grade-pass`:`grade-fail`}`,title:r.fail_reason,children:[r.letter_grade,` (`,r.gp.toFixed(1),`)`]})}),(0,u.jsx)(`td`,{style:{textAlign:`center`},children:(0,u.jsx)(`input`,{type:`checkbox`,checked:!!e.absent,onChange:e=>Ye(i,`absent`,e.target.checked)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`input`,{type:`text`,className:`remarks-input-box`,placeholder:`মন্তব্য`,value:e.remarks,onChange:e=>Ye(i,`remarks`,e.target.value)})})]},e.student_id||e.student_code||n)}),!qe.length&&(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`11`,className:`empty-table-cell`,children:K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`শ্রেণি ${o(M)} এর "${N} বিভাগ"-এ কোনো শিক্ষার্থী পাওয়া যায়নি অথবা উপরের "🔄 লোড" বাটনে ক্লিক করুন।`:`শিক্ষার্থী তালিকা প্রস্তুত করতে উপরের "🔄 লোড" বাটনে ক্লিক করুন।`})})]})]})})]}),y===`grading`&&(0,u.jsxs)(`div`,{className:`exam-card-form full-width-card`,children:[(0,u.jsx)(`div`,{className:`card-header-styled`,children:(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`মূল্যায়ন পলিসি`}),(0,u.jsx)(`h3`,{children:`🎯 ঢাকা শিক্ষা বোর্ড প্রমিত গ্রেডিং পদ্ধতি ও মূল্যায়ন নিয়মাবলী`})]})}),(0,u.jsxs)(`div`,{className:`grading-grid-cards`,children:[(0,u.jsxs)(`div`,{className:`grading-policy-card`,children:[(0,u.jsx)(`h4`,{children:`📊 ঢাকা শিক্ষা বোর্ড লেটার গ্রেড ও জিপিএ স্কেল (GPA 5.0)`}),(0,u.jsxs)(`table`,{className:`modern-exam-table marksheet-scale-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{children:`প্রাপ্ত নম্বর শতকরা (%)`}),(0,u.jsx)(`th`,{children:`লেটার গ্রেড`}),(0,u.jsx)(`th`,{children:`গ্রেড পয়েন্ট (GP)`}),(0,u.jsx)(`th`,{children:`মন্তব্য`})]})}),(0,u.jsx)(`tbody`,{children:n.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsxs)(`td`,{children:[o(e.min_pct),`% - `,o(Math.floor(e.max_pct)),`%`]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{className:`code-pill`,children:e.letter_grade})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:o(e.gpa.toFixed(1))})}),(0,u.jsx)(`td`,{children:e.label_bn})]},e.letter_grade))})]})]}),(0,u.jsxs)(`div`,{className:`grading-policy-card`,children:[(0,u.jsx)(`h4`,{children:`🏛️ মূল্যায়ন নীতি (৯ম ও ১০ম শ্রেণি)`}),(0,u.jsxs)(`ul`,{className:`policy-list`,children:[(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`বিভাগভিত্তিক ৩টি মূল বিষয়:`}),` বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার নির্দিষ্ট ৩টি মূল বিষয়ে পৃথকভাবে পাস বাধ্যতামূলক।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`৪র্থ বিষয় (ঐচ্ছিক) নিয়ম:`}),` ৪র্থ বিষয়ে প্রাপ্ত জিপিএ থেকে ২.০০ বাদ দিয়ে অতিরিক্ত পয়েন্ট (সর্বোচ্চ ৩.০০) মূল জিপিএ-তে যোগ হবে।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`সূত্র:`}),` `,(0,u.jsx)(`code`,{children:`জিপিএ = (মূল বিষয়সমূহের জিপিএ যোগফল + অতিরিক্ত পয়েন্ট) ÷ মূল বিষয়ের সংখ্যা`}),` (সর্বোচ্চ ৫.০০)।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`৪র্থ বিষয়ে ফেল প্রভাব:`}),` ৪র্থ বিষয়ে ফেল করলেও মূল বিষয়সমূহে পাস থাকলে সামগ্রিক ফলাফল ফেল হবে না।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`আবশ্যিক বিষয় ফেল:`}),` বাংলা, ইংরেজি, গণিত বা অন্য কোনো মূল বিষয়ে ফেল করলে সামগ্রিক ফল অকৃতকার্য (F / ০.০০)।`]})]})]}),(0,u.jsxs)(`div`,{className:`grading-policy-card`,children:[(0,u.jsx)(`h4`,{children:`📋 মূল্যায়ন নীতি (৬ষ্ঠ - ৮ম শ্রেণি)`}),(0,u.jsxs)(`ul`,{className:`policy-list`,children:[(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`সকল বিষয়ে পাস:`}),` সকল আবশ্যিক বিষয়ে পৃথকভাবে ন্যূনতম ৩৩% নম্বর পেয়ে উত্তীর্ণ হওয়া বাধ্যতামূলক।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`সামগ্রিক জিপিএ:`}),` `,(0,u.jsx)(`code`,{children:`জিপিএ = সকল বিষয়ের গ্রেড পয়েন্ট যোগফল ÷ মোট বিষয়ের সংখ্যা`}),`।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`এক বিষয়ে ফেল করলে:`}),` যেকোনো একটি বিষয়ে 'F' গ্রেড পেলে শিক্ষার্থীর সামগ্রিক ফলাফল 'অকৃতকার্য' (GPA 0.00) হিসেবে গণ্য হবে।`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(`b`,{children:`পৃথক পাস নিয়ম:`}),` সৃজনশীল (CQ), বহুনির্বাচনি (MCQ) এবং ব্যবহারিক (Practical) অংশে পৃথকভাবে ন্যূনতম ৩৩% নম্বর অর্জন করতে হবে।`]})]})]})]})]}),y===`processing`&&(0,u.jsxs)(`div`,{className:`exam-card-form full-width-card`,children:[(0,u.jsx)(`div`,{className:`card-header-styled`,children:(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`অটো প্রসেসিং ইঞ্জিন`}),(0,u.jsx)(`h3`,{children:`⚙️ ফলাফল প্রক্রিয়াকরণ ও মেধা তালিকা গণনা (Result Processing)`})]})}),(0,u.jsx)(`p`,{className:`card-desc`,children:`নির্বাচিত পরীক্ষা ও শ্রেণির সকল শিক্ষার্থীর সংগৃহীত নম্বর থেকে ঢাকা শিক্ষা বোর্ডের নিয়ম অনুযায়ী স্বয়ংক্রিয়ভাবে জিপিএ, লেটার গ্রেড, পাশ-ফেল এবং মেধা তালিকা প্রস্তুত করুন।`}),(0,u.jsxs)(`div`,{className:`exam-processing-box`,children:[(0,u.jsxs)(`div`,{className:`proc-info-line`,children:[(0,u.jsx)(`b`,{children:`নির্বাচিত পরীক্ষা:`}),` `,q?q.name_bn:`পরীক্ষা নির্বাচিত নেই`]}),(0,u.jsxs)(`div`,{className:`proc-info-line`,children:[(0,u.jsx)(`b`,{children:`শিক্ষাবর্ষ:`}),` `,o(O),` | `,(0,u.jsx)(`b`,{children:`শ্রেণি:`}),` শ্রেণি `,o(M)]}),(0,u.jsxs)(`div`,{className:`proc-info-line`,children:[(0,u.jsx)(`b`,{children:`মূল্যায়ন নীতি:`}),` `,K?`৪র্থ বিষয়ের অতিরিক্ত পয়েন্ট বোনাস প্রযোজ্য`:`সকল আবশ্যিক বিষয়ে পৃথক পাস প্রযোজ্য`]}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary btn-large`,onClick:ct,disabled:!A,children:`🧮 Result Process চালান`})]}),V?.overall&&(0,u.jsxs)(`div`,{className:`report-cards`,style:{marginTop:`20px`},children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall.students||0)}),(0,u.jsx)(`span`,{children:`মোট পরীক্ষার্থী`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall.passed||0)}),(0,u.jsx)(`span`,{children:`উত্তীর্ণ শিক্ষার্থী`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall.failed||0)}),(0,u.jsx)(`span`,{children:`অকৃতকার্য`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsxs)(`b`,{children:[o(V.overall.pass_rate||0),`%`]}),(0,u.jsx)(`span`,{children:`পাসের হার`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall.avg_gpa||0)}),(0,u.jsx)(`span`,{children:`গড় GPA`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall.gpa5_count||0)}),(0,u.jsx)(`span`,{children:`GPA 5.00 (A+)`})]})]}),(0,u.jsxs)(`div`,{className:`preset-chip-shelf`,style:{marginTop:`20px`},children:[(0,u.jsx)(`span`,{className:`preset-label`,children:`পরবর্তী ধাপে যান:`}),(0,u.jsx)(`button`,{type:`button`,className:`preset-chip`,onClick:()=>b(`tabulation`),children:`📋 ট্যাবুলেশন শিট দেখুন ➜`}),(0,u.jsx)(`button`,{type:`button`,className:`preset-chip`,onClick:()=>b(`marksheet`),children:`📄 মার্কশিট ও প্রোগ্রেস রিপোর্ট দেখুন ➜`}),(0,u.jsx)(`button`,{type:`button`,className:`preset-chip`,onClick:()=>b(`merit`),children:`🏆 মেধা তালিকা দেখুন ➜`}),(0,u.jsx)(`button`,{type:`button`,className:`preset-chip`,style:{color:`#b91c1c`},onClick:()=>b(`failed_list`),children:`⚠️ অকৃতকার্য তালিকা দেখুন ➜`})]})]}),y===`merit`&&(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} চূড়ান্ত মেধা তালিকা`:`চূড়ান্ত মেধা তালিকা`}),(0,u.jsxs)(`h3`,{children:[`🏆 মেধা ও ফলাফল তালিকা — শ্রেণি `,o(M),` `,K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`(${N} — উত্তীর্ণ ${o(dt.length)} জন)`:`(উত্তীর্ণ ${o(dt.length)} জন)`,` (`,q?q.name_bn:`পরীক্ষা`,`)`]})]}),(0,u.jsxs)(`div`,{className:`table-action-group`,children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:700},onClick:at,title:`মেধা তালিকা অফিশিয়াল PDF ফরম্যাটে ডাউনলোড করুন`,children:`📥 মেধা তালিকা PDF ডাউনলোড`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:at,title:`অফিশিয়াল মেধা তালিকা প্রিন্ট করুন`,children:`🖨️ মেধা তালিকা প্রিন্ট`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:ot,title:`মেধা তালিকা CSV ফাইল ডাউনলোড করুন`,children:`📥 মেধা তালিকা CSV`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:()=>lt(!0),title:`সর্বশেষ সংরক্ষিত নম্বর থেকে ফলাফল রিফ্রেশ করুন`,children:`🔄 রিফ্রেশ`})]})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{style:{width:`85px`},children:K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} মেধা`:`মেধা স্থান`}),(0,u.jsx)(`th`,{style:{width:`60px`},children:`রোল`}),(0,u.jsx)(`th`,{children:`Student ID`}),(0,u.jsx)(`th`,{children:`শিক্ষার্থীর নাম`}),(0,u.jsx)(`th`,{children:`বিভাগ/গ্রুপ`}),(0,u.jsx)(`th`,{children:`মোট নম্বর`}),(0,u.jsx)(`th`,{children:`শতকরা`}),(0,u.jsx)(`th`,{children:`GPA`}),(0,u.jsx)(`th`,{children:`লেটার গ্রেড`}),(0,u.jsx)(`th`,{children:`ফলাফল`}),(0,u.jsx)(`th`,{children:`অকৃতকার্য বিষয়`})]})}),(0,u.jsxs)(`tbody`,{children:[dt.map(e=>{let t=e.display_merit||e.dept_merit||e.merit;return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{className:`merit-badge ${t===1?`merit-gold`:t===2?`merit-silver`:t===3?`merit-bronze`:``}`,children:o(t)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`roll-pill`,children:o(e.roll_no||`—`)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`code-pill`,children:e.student_id})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.name_bn})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`sub-tag-compulsory`,children:e.department||`সাধারণ`})}),(0,u.jsxs)(`td`,{children:[(0,u.jsx)(`b`,{children:e.total_marks}),` `,(0,u.jsxs)(`small`,{className:`text-muted`,children:[`/ `,e.total_full_marks]})]}),(0,u.jsxs)(`td`,{children:[e.percentage,`%`]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{style:{fontSize:`15px`,color:`#0b8050`},children:e.gpa})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`grade-pill grade-pass`,children:e.final_grade})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`status-pill status-active`,children:e.result_status})}),(0,u.jsx)(`td`,{children:e.failed_subjects&&e.failed_subjects.length>0?(0,u.jsx)(`span`,{className:`tab-fail-cell`,style:{padding:`2px 6px`,borderRadius:`4px`},children:e.failed_subjects.join(`, `)}):(0,u.jsx)(`span`,{className:`text-muted`,children:`সব পাস`})})]},e.id||e.student_id)}),!dt.length&&(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`11`,className:`empty-table-cell`,children:`মেধা তালিকায় প্রদর্শনের মতো কোনো উত্তীর্ণ শিক্ষার্থী পাওয়া যায়নি।`})})]})]})}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(4, 1fr)`,gap:`16px`,padding:`24px 20px 16px 20px`,borderTop:`1px solid #e2e8f0`,marginTop:`16px`,textAlign:`center`,background:`#fafafa`},children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #94a3b8`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#334155`},children:`শ্রেণি শিক্ষকের স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #94a3b8`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#334155`},children:`প্রস্তুতকারীর স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #94a3b8`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#334155`},children:`পরীক্ষা কমিটির আহ্বায়কের স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #94a3b8`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#334155`},children:`প্রধান শিক্ষকের স্বাক্ষর ও সিলমোহর`})]})]})]}),y===`failed_list`&&(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,style:{background:`#fee2e2`,color:`#991b1b`,border:`1px solid #fecaca`},children:K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} অকৃতকার্য তালিকা`:`অকৃতকার্য শিক্ষার্থী তালিকা`}),(0,u.jsxs)(`h3`,{children:[`⚠️ অকৃতকার্য শিক্ষার্থীর তালিকা — শ্রেণি `,o(M),` `,K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`(${N} — মোট ${o(Q.length)} জন)`:`(মোট ${o(Q.length)} জন)`,` (`,q?q.name_bn:`পরীক্ষা`,`)`]})]}),(0,u.jsxs)(`div`,{className:`table-action-group`,children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#b91c1c`,color:`#fff`,borderColor:`#b91c1c`,fontWeight:700},onClick:rt,title:`অকৃতকার্য শিক্ষার্থীদের তালিকা অফিশিয়াল PDF ফরম্যাটে ডাউনলোড করুন`,children:`📥 অকৃতকার্য তালিকা PDF ডাউনলোড`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:rt,title:`বিভাগভিত্তিক অকৃতকার্য শিক্ষার্থীদের তালিকা অফিশিয়াল ফরম্যাটে প্রিন্ট করুন`,children:`🖨️ অকৃতকার্য তালিকা প্রিন্ট`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:600},onClick:it,title:`অকৃতকার্য শিক্ষার্থীদের তালিকা CSV ফাইল ডাউনলোড করুন`,children:`📥 অকৃতকার্য তালিকা CSV`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:()=>lt(!0),title:`সর্বশেষ সংরক্ষিত নম্বর থেকে ফলাফল রিফ্রেশ করুন`,children:`🔄 রিফ্রেশ`})]})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`,padding:`12px 16px`,background:`#f8fafc`,borderBottom:`1px solid #e2e8f0`},children:[(0,u.jsxs)(`div`,{style:{flex:`1 1 130px`,background:`#fff`,border:`1px solid #e2e8f0`,borderRadius:`8px`,padding:`8px 12px`,textAlign:`center`},children:[(0,u.jsx)(`div`,{style:{fontSize:`11px`,color:`#64748b`,fontWeight:600},children:`মোট পরীক্ষার্থী`}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:`#0f172a`},children:[o(Z.length),` জন`]})]}),(0,u.jsxs)(`div`,{style:{flex:`1 1 130px`,background:`#fef2f2`,border:`1px solid #fecaca`,borderRadius:`8px`,padding:`8px 12px`,textAlign:`center`},children:[(0,u.jsx)(`div`,{style:{fontSize:`11px`,color:`#991b1b`,fontWeight:600},children:`মোট অকৃতকার্য`}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:`#dc2626`},children:[o(Q.length),` জন`]})]}),(0,u.jsxs)(`div`,{style:{flex:`1 1 130px`,background:`#fff`,border:`1px solid #e2e8f0`,borderRadius:`8px`,padding:`8px 12px`,textAlign:`center`},children:[(0,u.jsx)(`div`,{style:{fontSize:`11px`,color:`#64748b`,fontWeight:600},children:`অকৃতকার্যের হার`}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:`#b91c1c`},children:[o(Z.length?(Q.length/Z.length*100).toFixed(1):`0`),`%`]})]}),(0,u.jsxs)(`div`,{style:{flex:`1 1 130px`,background:`#fff`,border:`1px solid #e2e8f0`,borderRadius:`8px`,padding:`8px 12px`,textAlign:`center`},children:[(0,u.jsx)(`div`,{style:{fontSize:`11px`,color:`#64748b`,fontWeight:600},children:`১ বিষয়ে ফেল`}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:`#d97706`},children:[o(Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||1)===1).length),` জন`]})]}),(0,u.jsxs)(`div`,{style:{flex:`1 1 130px`,background:`#fff`,border:`1px solid #e2e8f0`,borderRadius:`8px`,padding:`8px 12px`,textAlign:`center`},children:[(0,u.jsx)(`div`,{style:{fontSize:`11px`,color:`#64748b`,fontWeight:600},children:`২ বিষয়ে ফেল`}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:`#ea580c`},children:[o(Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||0)===2).length),` জন`]})]}),(0,u.jsxs)(`div`,{style:{flex:`1 1 130px`,background:`#fff`,border:`1px solid #e2e8f0`,borderRadius:`8px`,padding:`8px 12px`,textAlign:`center`},children:[(0,u.jsx)(`div`,{style:{fontSize:`11px`,color:`#64748b`,fontWeight:600},children:`৩+ বিষয়ে ফেল`}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:`#dc2626`},children:[o(Q.filter(e=>(e.failed_count||e.failed_subjects&&e.failed_subjects.length||0)>=3).length),` জন`]})]})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`,justifyContent:`space-between`,padding:`10px 16px`,background:`#fff`,borderBottom:`1px solid #f1f5f9`,flexWrap:`wrap`},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`},children:[(0,u.jsx)(`span`,{style:{fontSize:`12px`,fontWeight:600,color:`#475569`},children:`🔍 ফিল্টার:`}),(0,u.jsxs)(`select`,{value:ve,onChange:e=>ye(e.target.value),style:{padding:`5px 10px`,borderRadius:`6px`,border:`1px solid #cbd5e1`,fontSize:`12px`},children:[(0,u.jsxs)(`option`,{value:`all`,children:[`সকল অকৃতকার্য শিক্ষার্থী (`,o(Q.length),` জন)`]}),(0,u.jsx)(`option`,{value:`1`,children:`শুধুমাত্র ১ বিষয়ে ফেল`}),(0,u.jsx)(`option`,{value:`2`,children:`শুধুমাত্র ২ বিষয়ে ফেল`}),(0,u.jsx)(`option`,{value:`3+`,children:`৩ বা ততোধিক বিষয়ে ফেল`})]})]}),(0,u.jsxs)(`div`,{style:{fontSize:`12px`,color:`#64748b`},children:[`প্রদর্শিত হচ্ছে: `,(0,u.jsx)(`b`,{children:o(ft.length)}),` জন`]})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{style:{width:`45px`},children:`ক্র.`}),(0,u.jsx)(`th`,{style:{width:`55px`},children:`রোল`}),(0,u.jsx)(`th`,{style:{width:`90px`},children:`Student ID`}),(0,u.jsx)(`th`,{children:`শিক্ষার্থীর নাম`}),(0,u.jsx)(`th`,{children:`বিভাগ/গ্রুপ`}),(0,u.jsx)(`th`,{style:{width:`85px`},children:`ফেল সংখ্যা`}),(0,u.jsx)(`th`,{style:{minWidth:`220px`},children:`অকৃতকার্য বিষয় ও বিবরণ`}),(0,u.jsx)(`th`,{style:{width:`80px`},children:`মোট নম্বর`}),(0,u.jsx)(`th`,{style:{width:`60px`},children:`GPA`}),(0,u.jsx)(`th`,{style:{width:`60px`},children:`গ্রেড`}),(0,u.jsx)(`th`,{children:`অভিভাবকের ফোন`})]})}),(0,u.jsxs)(`tbody`,{children:[ft.map((e,t)=>{let n=pt(e),r=n.length||e.failed_count||1,i=e.student?.guardian_phone||e.student?.phone||e.guardian_phone||``;return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`text-muted`,children:o(t+1)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`roll-pill`,children:o(e.roll_no||`—`)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`code-pill`,children:e.student_id})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.name_bn})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`sub-tag-compulsory`,children:e.department||`সাধারণ`})}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`span`,{style:{display:`inline-block`,padding:`2px 8px`,borderRadius:`12px`,fontSize:`11px`,fontWeight:700,background:`#fee2e2`,color:`#991b1b`,border:`1px solid #fecaca`},children:[o(r),`টি বিষয়`]})}),(0,u.jsx)(`td`,{children:n.length>0?(0,u.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`4px`},children:n.map((e,t)=>(0,u.jsxs)(`div`,{style:{fontSize:`11px`,background:`#fef2f2`,border:`1px solid #fecaca`,borderRadius:`4px`,padding:`3px 6px`,color:`#991b1b`,textAlign:`left`},children:[(0,u.jsx)(`b`,{children:e.name}),` `,e.total!==``&&(0,u.jsxs)(`span`,{style:{color:`#b91c1c`,fontWeight:600},children:[`(`,e.total,` নম্বর, `,e.grade,`)`]}),e.reason&&(0,u.jsx)(`small`,{style:{display:`block`,color:`#7f1d1d`},children:e.reason})]},t))}):(0,u.jsx)(`span`,{className:`tab-fail-cell`,style:{padding:`2px 6px`,borderRadius:`4px`},children:e.failed_subjects&&e.failed_subjects.length?e.failed_subjects.join(`, `):`সকল বিষয়`})}),(0,u.jsxs)(`td`,{children:[(0,u.jsx)(`b`,{children:e.total_marks}),` `,(0,u.jsxs)(`small`,{className:`text-muted`,children:[`/ `,e.total_full_marks]})]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{style:{fontSize:`15px`,color:`#dc2626`},children:e.gpa})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`grade-pill grade-fail`,children:e.final_grade||`F`})}),(0,u.jsx)(`td`,{children:i?(0,u.jsxs)(`a`,{href:`tel:${i}`,style:{color:`#0369a1`,textDecoration:`none`,fontWeight:600,fontSize:`12px`},children:[`📞 `,i]}):(0,u.jsx)(`span`,{className:`text-muted`,children:`—`})})]},e.id||e.student_id)}),!Q.length&&(0,u.jsx)(`tr`,{children:(0,u.jsxs)(`td`,{colSpan:`11`,className:`empty-table-cell`,style:{padding:`32px 16px`,background:`#f0fdf4`,color:`#166534`},children:[(0,u.jsx)(`div`,{style:{fontSize:`24px`,marginBottom:`8px`},children:`🎉`}),(0,u.jsx)(`b`,{children:`অভিনন্দন! নির্বাচিত শ্রেণি ও বিভাগে কোনো অকৃতকার্য শিক্ষার্থী নেই।`}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,color:`#15803d`,marginTop:`4px`},children:`শতভাগ (১০০%) শিক্ষার্থী সফলভাবে উত্তীর্ণ হয়েছে।`})]})}),Q.length>0&&!ft.length&&(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`11`,className:`empty-table-cell`,children:`নির্বাচিত ফিল্টারে কোনো অকৃতকার্য শিক্ষার্থী পাওয়া যায়নি।`})})]})]})}),(0,u.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(4, 1fr)`,gap:`16px`,padding:`24px 20px 16px 20px`,borderTop:`1px solid #fee2e2`,marginTop:`16px`,textAlign:`center`,background:`#fef2f2`},children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #b91c1c`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#991b1b`},children:`শ্রেণি শিক্ষকের স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #b91c1c`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#991b1b`},children:`প্রস্তুতকারীর স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #b91c1c`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#991b1b`},children:`পরীক্ষা কমিটির আহ্বায়কের স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{style:{borderTop:`1px dashed #b91c1c`,width:`80%`,margin:`0 auto 6px auto`}}),(0,u.jsx)(`div`,{style:{fontSize:`12px`,fontWeight:600,color:`#991b1b`},children:`প্রধান শিক্ষকের স্বাক্ষর ও সিলমোহর`})]})]})]}),y===`tabulation`&&(0,u.jsxs)(`div`,{className:`exam-card-table`,children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`card-badge`,children:`মাস্টার ট্যাবুলেশন শিট`}),(0,u.jsxs)(`h3`,{children:[`📋 মাস্টার ট্যাবুলেশন শিট — শ্রেণি `,o(M),` (`,q?q.name_bn:`পরীক্ষা`,`)`]})]}),(0,u.jsxs)(`div`,{className:`table-action-group`,children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:600},onClick:tt,title:`শ্রেণির সকল বিষয়ের মাস্টার ট্যাবুলেশন শিট CSV ফাইল ডাউনলোড করুন`,children:`📥 মাস্টার শিট CSV`}),(0,u.jsxs)(`label`,{className:`btn-modern-action`,style:{background:`#059669`,color:`#fff`,borderColor:`#059669`,fontWeight:600,cursor:`pointer`,display:`inline-flex`,alignItems:`center`,gap:`5px`},title:`সকল বিষয়ের মার্কস পূরণকৃত CSV আপলোড করে মাস্টার শিট হালনাগাদ করুন`,children:[`📤 মাস্টার শিট CSV আপলোড`,(0,u.jsx)(`input`,{type:`file`,accept:`.csv,text/csv`,style:{display:`none`},onChange:st})]}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:()=>lt(!0),title:`সর্বশেষ সংরক্ষিত নম্বর থেকে ফলাফল রিফ্রেশ করুন`,children:`🔄 রিফ্রেশ`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#0284c7`,color:`#fff`,borderColor:`#0284c7`,fontWeight:700},onClick:nt,title:`ট্যাবুলেশন শিট সরাসরি PDF ডাউনলোড ও সংরক্ষণ করুন (Legal Landscape)`,children:`📥 ট্যাবুলেশন শিট PDF ডাউনলোড`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,style:{background:`#047857`,color:`#fff`,borderColor:`#047857`,fontWeight:700},onClick:nt,title:`Legal Landscape (লিগ্যাল পেজ ল্যান্ডস্কেপ) সাইজে প্রিন্ট করুন`,children:`🖨️ প্রিন্ট মাস্টার শিট (Legal Landscape)`})]})]}),K&&(0,u.jsx)(`div`,{style:{padding:`8px 16px`,background:`#eff6ff`,border:`1px solid #bfdbfe`,borderRadius:`8px`,marginBottom:`12px`,fontSize:`13px`,color:`#1e3a8a`,display:`flex`,alignItems:`center`,gap:`8px`},children:(0,u.jsxs)(`span`,{children:[`📌 `,(0,u.jsx)(`b`,{children:`৯ম ও ১০ম শ্রেণি বোর্ড গ্রেডিং নিয়ম:`}),` বাংলা (১ম ও ২য় পত্র মিলিয়ে CQ পাস ৪৬, MCQ পাস ২০, মোট পাস ৬৬) এবং ইংরেজি (১ম ও ২য় পত্র মিলিয়ে মোট পাস ৬৬)। উভয় পত্রের সমন্বিত নম্বরের ভিত্তিতে গ্রেড ও জিপিএ নির্ধারিত।`]})}),(0,u.jsx)(`div`,{className:`tabulation-matrix-container`,children:(0,u.jsxs)(`table`,{className:`tabulation-table`,children:[(0,u.jsxs)(`thead`,{children:[(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{rowSpan:`2`,style:{width:`50px`},children:`রোল`}),(0,u.jsx)(`th`,{rowSpan:`2`,style:{minWidth:`150px`},children:`শিক্ষার্থীর নাম`}),We.map(e=>(0,u.jsx)(`th`,{colSpan:`4`,className:`tab-sub-head`,children:e.headerTitle},e.code)),(0,u.jsx)(`th`,{rowSpan:`2`,children:`সর্বমোট`}),(0,u.jsx)(`th`,{rowSpan:`2`,children:`GPA`}),(0,u.jsx)(`th`,{rowSpan:`2`,children:`গ্রেড`}),(0,u.jsx)(`th`,{rowSpan:`2`,children:`ফলাফল`})]}),(0,u.jsx)(`tr`,{children:We.map(e=>(0,u.jsxs)(l.Fragment,{children:[(0,u.jsx)(`th`,{className:`tab-sub-col`,children:`CQ`}),(0,u.jsx)(`th`,{className:`tab-sub-col`,children:`MCQ`}),(0,u.jsx)(`th`,{className:`tab-sub-col`,children:`Prac`}),(0,u.jsx)(`th`,{className:`tab-sub-col`,children:`মোট`})]},`${e.code}-heads`))})]}),(0,u.jsxs)(`tbody`,{children:[ut.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`roll-pill`,children:o(e.roll_no)})}),(0,u.jsx)(`td`,{style:{textAlign:`left`},children:(0,u.jsx)(`b`,{children:e.name_bn})}),We.map(t=>{let n=Ge(e,t);if(!n)return(0,u.jsxs)(l.Fragment,{children:[(0,u.jsx)(`td`,{className:`text-muted tab-sub-col`,children:`—`}),(0,u.jsx)(`td`,{className:`text-muted tab-sub-col`,children:`—`}),(0,u.jsx)(`td`,{className:`text-muted tab-sub-col`,children:`—`}),(0,u.jsx)(`td`,{className:`text-muted tab-sub-col`,children:`—`})]},`${e.id}-${t.code}-na`);let r=null;return t.isMerged&&(String(n.code)===`111`?r=(0,u.jsx)(`span`,{style:{fontSize:`9px`,color:`#047857`,display:`block`,fontWeight:600},children:`ইসলাম`}):String(n.code)===`112`?r=(0,u.jsx)(`span`,{style:{fontSize:`9px`,color:`#b45309`,display:`block`,fontWeight:600},children:`হিন্দু`}):String(n.code)===`126`?r=(0,u.jsx)(`span`,{style:{fontSize:`9px`,color:`#1d4ed8`,display:`block`,fontWeight:600},children:`উ: গণিত`}):String(n.code)===`134`&&(r=(0,u.jsx)(`span`,{style:{fontSize:`9px`,color:`#15803d`,display:`block`,fontWeight:600},children:`কৃষি`}))),(0,u.jsxs)(l.Fragment,{children:[(0,u.jsx)(`td`,{className:`tab-sub-col`,children:n.written_max>0&&n.written!==null&&n.written!==void 0?n.written:`—`}),(0,u.jsx)(`td`,{className:`tab-sub-col`,children:n.mcq_max>0&&n.mcq!==null&&n.mcq!==void 0?n.mcq:`—`}),(0,u.jsx)(`td`,{className:`tab-sub-col`,children:n.practical_max>0&&n.practical!==null&&n.practical!==void 0?n.practical:`—`}),(0,u.jsxs)(`td`,{className:`tab-sub-col ${n.is_pass?`tab-pass-cell`:`tab-fail-cell`}`,title:n.is_combined?`${n.combined_title}: মোট প্রাপ্ত ${n.combined_total}, গ্রেড ${n.letter_grade}`:``,children:[(0,u.jsx)(`b`,{children:n.total}),(0,u.jsx)(`div`,{style:{fontSize:`10px`},children:n.letter_grade}),r]})]},`${e.id}-${t.code}`)}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.total_marks})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{style:{color:e.is_pass?`#0b8050`:`#dc2626`},children:e.gpa})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`grade-pill ${e.is_pass?`grade-pass`:`grade-fail`}`,children:e.final_grade})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`status-pill ${e.is_pass?`status-active`:`status-completed`}`,children:e.result_status})})]},e.id||e.student_id)),!ut.length&&(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:2+We.length*4+4,className:`empty-table-cell`,children:`ট্যাবুলেশন শিট দেখতে আগে ফলাফল প্রসেস সম্পন্ন করুন।`})})]})]})})]}),y===`marksheet`&&(0,u.jsxs)(`div`,{className:`marksheet-console-wrapper`,children:[(0,u.jsxs)(`div`,{className:`marksheet-nav-toolbar no-print`,style:{display:`flex`,flexWrap:`wrap`,gap:`10px`,alignItems:`center`,justifyContent:`space-between`,marginBottom:`14px`,background:`#f8fafc`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #e2e8f0`},children:[(0,u.jsxs)(`div`,{className:`student-selector-box`,style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,u.jsx)(`label`,{style:{fontWeight:700,whiteSpace:`nowrap`,fontSize:`13px`},children:`শিক্ষার্থী নির্বাচন:`}),(0,u.jsx)(`select`,{value:B,onChange:e=>le(Number(e.target.value)),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid #cbd5e1`,fontWeight:600,fontSize:`13px`,background:`#fff`},children:Z.map((e,t)=>(0,u.jsxs)(`option`,{value:t,children:[`রোল: `,o(e.roll_no),` — `,e.name_bn,` (`,e.student_id,`) — জিপিএ: `,o(e.gpa)]},e.id||t))})]}),(0,u.jsxs)(`div`,{className:`signature-type-selector-box`,style:{display:`inline-flex`,alignItems:`center`,gap:`5px`,background:`#fff`,padding:`4px 8px`,borderRadius:`6px`,border:`1px solid #cbd5e1`},children:[(0,u.jsx)(`span`,{style:{fontWeight:700,whiteSpace:`nowrap`,fontSize:`12px`,color:`#334155`},children:`✍️ স্বাক্ষর:`}),(0,u.jsxs)(`button`,{type:`button`,onClick:()=>be(`auto`),style:{padding:`3px 8px`,fontSize:`11px`,fontWeight:U===`auto`?700:500,background:U===`auto`?`#0284c7`:`#f1f5f9`,color:U===`auto`?`#fff`:`#475569`,border:`1px solid`,borderColor:U===`auto`?`#0284c7`:`#cbd5e1`,borderRadius:`4px`,cursor:`pointer`},title:`স্বয়ংক্রিয় প্রমিত নিয়ম: প্রোগ্রেস রিপোর্টে ৪টি স্বাক্ষর (প্রস্তুতকারী ও অভিভাবক উভয়ই), একাডেমিক ট্রান্সক্রিপ্টে ৩টি স্বাক্ষর (প্রস্তুতকারী)`,children:[`স্বয়ংক্রিয় (`,ze?`৪টি`:`৩টি`,`)`]}),(0,u.jsx)(`button`,{type:`button`,onClick:()=>be(`both`),style:{padding:`3px 8px`,fontSize:`11px`,fontWeight:U===`both`?700:500,background:U===`both`?`#0284c7`:`#f1f5f9`,color:U===`both`?`#fff`:`#475569`,border:`1px solid`,borderColor:U===`both`?`#0284c7`:`#cbd5e1`,borderRadius:`4px`,cursor:`pointer`},title:`শ্রেণি শিক্ষক | প্রস্তুতকারী | অভিভাবক | প্রধান শিক্ষক (৪ কলাম)`,children:`৪টি স্বাক্ষর (উভয়ই)`}),(0,u.jsx)(`button`,{type:`button`,onClick:()=>be(`preparer`),style:{padding:`3px 8px`,fontSize:`11px`,fontWeight:U===`preparer`?700:500,background:U===`preparer`?`#0284c7`:`#f1f5f9`,color:U===`preparer`?`#fff`:`#475569`,border:`1px solid`,borderColor:U===`preparer`?`#0284c7`:`#cbd5e1`,borderRadius:`4px`,cursor:`pointer`},title:`শ্রেণি শিক্ষক | প্রস্তুতকারী | প্রধান শিক্ষক (৩ কলাম)`,children:`প্রস্তুতকারী (৩টি)`}),(0,u.jsx)(`button`,{type:`button`,onClick:()=>be(`guardian`),style:{padding:`3px 8px`,fontSize:`11px`,fontWeight:U===`guardian`?700:500,background:U===`guardian`?`#0284c7`:`#f1f5f9`,color:U===`guardian`?`#fff`:`#475569`,border:`1px solid`,borderColor:U===`guardian`?`#0284c7`:`#cbd5e1`,borderRadius:`4px`,cursor:`pointer`},title:`শ্রেণি শিক্ষক | অভিভাবক | প্রধান শিক্ষক (৩ কলাম)`,children:`অভিভাবক (৩টি)`})]}),(0,u.jsxs)(`div`,{className:`nav-buttons-group`,style:{display:`flex`,gap:`8px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,onClick:()=>lt(!0),title:`সর্বশেষ সংরক্ষিত নম্বর থেকে ফলাফল রিফ্রেশ করুন`,style:{background:`#f0fdf4`,color:`#166534`,borderColor:`#bbf7d0`,fontWeight:600},children:`🔄 রিফ্রেশ`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,disabled:B<=0,onClick:()=>le(e=>Math.max(0,e-1)),children:`⬅ পূর্ববর্তী`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-action`,disabled:B>=Z.length-1,onClick:()=>le(e=>Math.min(Z.length-1,e+1)),children:`পরবর্তী ➜`}),(0,u.jsxs)(`button`,{type:`button`,className:`btn-modern-primary`,onClick:Ot,title:`বর্তমানে নির্বাচিত একক শিক্ষার্থীর ${Ue} সরাসরি PDF ডাউনলোড ও সংরক্ষণ করুন`,style:{background:`#0284c7`,borderColor:`#0284c7`,color:`#fff`,padding:`6px 14px`,borderRadius:`6px`,fontWeight:700,fontSize:`13px`},children:[`📥 এই `,J?`ট্রান্সক্রিপ্ট`:`মার্কশিট`,` PDF ডাউনলোড`]}),(0,u.jsxs)(`button`,{type:`button`,className:`btn-modern-secondary`,onClick:Ot,title:`বর্তমানে নির্বাচিত একক শিক্ষার্থীর ${Ue} প্রিন্ট করুন (A4)`,style:{padding:`6px 14px`,borderRadius:`6px`,fontWeight:700,fontSize:`13px`},children:[`🖨️ এই `,J?`ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,` প্রিন্ট (A4)`]}),(0,u.jsxs)(`button`,{type:`button`,onClick:()=>Dt(Z),title:`শ্রেণির সকল শিক্ষার্থীর ${Ue} একসাথে PDF ডাউনলোড ও সেভ করুন`,style:{background:`#0284c7`,color:`#fff`,border:`none`,padding:`6px 14px`,borderRadius:`6px`,fontWeight:800,cursor:`pointer`,fontSize:`13px`,display:`inline-flex`,alignItems:`center`,gap:`6px`,boxShadow:`0 2px 4px rgba(2, 132, 199, 0.25)`},children:[`📥 সকল `,J?`একাডেমিক ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,` PDF (`,o(Z.length),` জন)`]}),(0,u.jsxs)(`button`,{type:`button`,onClick:()=>Dt(Z),title:`শ্রেণির সকল শিক্ষার্থীর ${Ue} একসাথে একের পর এক আলাদা পৃষ্ঠায় প্রিন্ট করুন`,style:{background:`#047857`,color:`#fff`,border:`none`,padding:`6px 14px`,borderRadius:`6px`,fontWeight:800,cursor:`pointer`,fontSize:`13px`,display:`inline-flex`,alignItems:`center`,gap:`6px`,boxShadow:`0 2px 4px rgba(4, 120, 87, 0.25)`},children:[`🖨️ সকল `,J?`একাডেমিক ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,` প্রিন্ট`]}),(0,u.jsxs)(`button`,{type:`button`,onClick:()=>fe(!de),title:`রোল নম্বর রেঞ্জ বা পাস/ফেল অনুসারে একাধিক প্রগ্রেস রিপোর্ট প্রিন্ট`,style:{background:de?`#334155`:`#fff`,color:de?`#fff`:`#334155`,border:`1px solid #cbd5e1`,padding:`6px 12px`,borderRadius:`6px`,fontWeight:600,cursor:`pointer`,fontSize:`12.5px`},children:[`⚙️ রোল রেঞ্জ / কাস্টম ব্যাচ `,de?`▲`:`▼`]})]})]}),de&&(0,u.jsxs)(`div`,{style:{background:`#f0fdf4`,border:`1.5px solid #059669`,borderRadius:`8px`,padding:`12px 18px`,marginBottom:`16px`,animation:`fadeIn 0.2s ease`},className:`no-print`,children:[(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`10px`,borderBottom:`1px dashed #a7f3d0`,paddingBottom:`6px`},children:[(0,u.jsxs)(`b`,{style:{color:`#065f46`,fontSize:`13.5px`,display:`flex`,alignItems:`center`,gap:`6px`},children:[`📑 একাধিক শিক্ষার্থীর `,J?`একাডেমিক ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,` একসাথে প্রিন্ট অপশন (ব্যাচ প্রিন্ট)`]}),(0,u.jsxs)(`span`,{style:{fontSize:`12px`,color:`#047857`},children:[`* প্রতিটি শিক্ষার্থীর `,J?`ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,` স্বয়ংক্রিয়ভাবে আলাদা আলাদা A4 পেজে প্রিন্ট হবে`]})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`16px`,alignItems:`center`},children:[(0,u.jsxs)(`label`,{style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,cursor:`pointer`,fontSize:`13px`,fontWeight:600,color:`#1e293b`},children:[(0,u.jsx)(`input`,{type:`radio`,name:`batchMode`,value:`all`,checked:H===`all`,onChange:()=>pe(`all`)}),`শ্রেণির সকল শিক্ষার্থী (`,o(Z.length),` জন)`]}),(0,u.jsxs)(`label`,{style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,cursor:`pointer`,fontSize:`13px`,fontWeight:600,color:`#1e293b`},children:[(0,u.jsx)(`input`,{type:`radio`,name:`batchMode`,value:`range`,checked:H===`range`,onChange:()=>pe(`range`)}),`রোল নম্বর রেঞ্জ:`]}),H===`range`&&(0,u.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,background:`#fff`,padding:`3px 8px`,borderRadius:`5px`,border:`1px solid #cbd5e1`},children:[(0,u.jsx)(`span`,{style:{fontSize:`12px`,color:`#64748b`},children:`রোল হতে:`}),(0,u.jsx)(`input`,{type:`number`,placeholder:`যেমন: ১`,value:me,onChange:e=>he(e.target.value),style:{width:`65px`,padding:`3px 6px`,border:`1px solid #cbd5e1`,borderRadius:`4px`,fontSize:`12.5px`}}),(0,u.jsx)(`span`,{style:{fontSize:`12px`,color:`#64748b`},children:`পর্যন্ত:`}),(0,u.jsx)(`input`,{type:`number`,placeholder:`যেমন: ২৫`,value:ge,onChange:e=>_e(e.target.value),style:{width:`65px`,padding:`3px 6px`,border:`1px solid #cbd5e1`,borderRadius:`4px`,fontSize:`12.5px`}})]}),(0,u.jsxs)(`label`,{style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,cursor:`pointer`,fontSize:`13px`,fontWeight:600,color:`#1e293b`},children:[(0,u.jsx)(`input`,{type:`radio`,name:`batchMode`,value:`passed`,checked:H===`passed`,onChange:()=>pe(`passed`)}),`শুধুমাত্র উত্তীর্ণ / পাস (`,o(Z.filter(e=>e.result_status===`উত্তীর্ণ`||e.final_grade!==`F`).length),` জন)`]}),(0,u.jsxs)(`label`,{style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,cursor:`pointer`,fontSize:`13px`,fontWeight:600,color:`#1e293b`},children:[(0,u.jsx)(`input`,{type:`radio`,name:`batchMode`,value:`failed`,checked:H===`failed`,onChange:()=>pe(`failed`)}),`অনুত্তীর্ণ / ফেল (`,o(Z.filter(e=>e.result_status!==`উত্তীর্ণ`&&e.final_grade===`F`).length),` জন)`]}),(0,u.jsxs)(`div`,{style:{display:`inline-flex`,gap:`8px`,marginLeft:`auto`},children:[(0,u.jsxs)(`button`,{type:`button`,onClick:At,style:{background:`#0284c7`,color:`#fff`,border:`none`,padding:`7px 16px`,borderRadius:`6px`,fontWeight:700,cursor:`pointer`,fontSize:`13px`,boxShadow:`0 2px 4px rgba(2, 132, 199, 0.25)`},title:`নির্বাচিত শিক্ষার্থীদের ${Ue} PDF হিসেবে সেভ করুন`,children:[`📥 নির্বাচিত `,J?`ট্রান্সক্রিপ্ট`:`প্রোগ্রেস রিপোর্ট`,` PDF (`,o(kt().length),` জন)`]}),(0,u.jsx)(`button`,{type:`button`,onClick:At,style:{background:`#047857`,color:`#fff`,border:`none`,padding:`7px 16px`,borderRadius:`6px`,fontWeight:700,cursor:`pointer`,fontSize:`13px`,boxShadow:`0 2px 4px rgba(4, 120, 87, 0.25)`},title:`নির্বাচিত শিক্ষার্থীদের প্রগ্রেস রিপোর্ট সরাসরি প্রিন্ট করুন`,children:`🖨️ প্রিন্ট করুন`})]})]})]}),$?(0,u.jsxs)(`div`,{className:`official-marksheet-wrapper`,id:`official-academic-transcript`,children:[(0,u.jsxs)(`div`,{className:`transcript-top-content`,children:[(0,u.jsxs)(`div`,{className:`transcript-official-header`,children:[(0,u.jsx)(`h1`,{className:`transcript-school-name`,children:`মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়`}),(0,u.jsx)(`div`,{className:`transcript-school-line`,children:`ডাকঘর: মগড়া, উপজেলা: কালিহাতী, জেলা: টাঙ্গাইল`}),(0,u.jsx)(`div`,{className:`transcript-school-line`,children:`স্থাপিত: ১৯৪৬`}),(0,u.jsx)(`div`,{className:`transcript-school-eiin`,children:`EIIN: 114290`})]}),(0,u.jsx)(`div`,{className:`marksheet-exam-title-badge`,children:(0,u.jsx)(`span`,{children:He})}),(0,u.jsxs)(`div`,{className:`marksheet-top-info-grid`,children:[(0,u.jsxs)(`div`,{className:`marksheet-student-card`,children:[(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`শিক্ষার্থীর নাম:`}),` `,$.name_bn,` `,$.name_en?`(${$.name_en.toUpperCase()})`:``]}),(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`Student ID:`}),` `,$.student_id,` | `,(0,u.jsx)(`b`,{children:`রোল নম্বর:`}),` `,o($.roll_no)]}),(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`শ্রেণি:`}),` শ্রেণি `,o(M),` | `,(0,u.jsx)(`b`,{children:`শাখা:`}),` `,$.section||(K?`বিজ্ঞান বিভাগ`:`A`)]}),(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`বিভাগ / গ্রুপ:`}),` `,$.department||(K?`বিজ্ঞান`:`সাধারণ`)]})]}),(0,u.jsxs)(`div`,{className:`marksheet-student-card`,children:[(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`পিতার নাম:`}),` `,$.student?.father_name||$.father_name||`মুহাম্মদ আবুবকর সিদ্দিক`]}),(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`মাতার নাম:`}),` `,$.student?.mother_name||$.mother_name||`তাহমিনা`]}),(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`শিক্ষাবর্ষ:`}),` `,o(O),` খ্রি.`]}),(0,u.jsxs)(`div`,{className:`info-row`,children:[(0,u.jsx)(`b`,{children:`পরীক্ষার নাম:`}),` `,q?q.name_bn:J?`নির্বাচনী পরীক্ষা`:`অর্ধ-বার্ষিক পরীক্ষা`]})]})]}),(0,u.jsxs)(`table`,{className:`marksheet-subjects-table marksheet-board-table`,children:[(0,u.jsxs)(`thead`,{children:[(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{rowSpan:`2`,style:{width:`75px`},children:`Subject Code`}),(0,u.jsx)(`th`,{rowSpan:`2`,style:{textAlign:`center`},children:`Subject Name`}),(0,u.jsx)(`th`,{colSpan:`4`,children:`Marks`}),(0,u.jsx)(`th`,{rowSpan:`2`,style:{width:`80px`},children:`Grade`})]}),(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{style:{width:`75px`},children:`CQ/Theory`}),(0,u.jsx)(`th`,{style:{width:`65px`},children:`MCQ`}),(0,u.jsx)(`th`,{style:{width:`65px`},children:`Practical`}),(0,u.jsx)(`th`,{style:{width:`70px`},children:`Total`})]})]}),(0,u.jsx)(`tbody`,{children:_t.map(e=>{let t=String(e.code||``);if(t===`101`)return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:`101`})}),(0,u.jsx)(`td`,{className:`text-left`,children:(0,u.jsx)(`b`,{children:`BANGLA-I`})}),(0,u.jsx)(`td`,{children:e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:0}),(0,u.jsx)(`td`,{children:e.absent?`অনুপস্থিত`:e.mcq!==``&&e.mcq!==null&&e.mcq!==void 0?e.mcq:0}),(0,u.jsx)(`td`,{rowSpan:vt?2:1,children:`—`}),(0,u.jsx)(`td`,{rowSpan:vt?2:1,children:(0,u.jsx)(`b`,{children:vt?St:e.absent?0:e.total})}),(0,u.jsxs)(`td`,{rowSpan:vt?2:1,className:`transcript-grade-cell`,children:[(0,u.jsx)(`div`,{className:`grade-letter`,children:e.letter_grade}),(0,u.jsxs)(`div`,{className:`grade-gp`,children:[`GP `,e.gp.toFixed(2)]})]})]},e.code||e.subject_id);if(t===`102`)return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:`102`})}),(0,u.jsx)(`td`,{className:`text-left`,children:(0,u.jsx)(`b`,{children:`BANGLA-II`})}),(0,u.jsx)(`td`,{children:e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:0}),(0,u.jsx)(`td`,{children:e.absent?`অনুপস্থিত`:e.mcq!==``&&e.mcq!==null&&e.mcq!==void 0?e.mcq:0}),!vt&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`td`,{children:`—`}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.absent?0:e.total})}),(0,u.jsxs)(`td`,{className:`transcript-grade-cell`,children:[(0,u.jsx)(`div`,{className:`grade-letter`,children:e.letter_grade}),(0,u.jsxs)(`div`,{className:`grade-gp`,children:[`GP `,e.gp.toFixed(2)]})]})]})]},e.code||e.subject_id);if(t===`107`)return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:`107`})}),(0,u.jsx)(`td`,{className:`text-left`,children:(0,u.jsx)(`b`,{children:`ENGLISH-I`})}),(0,u.jsx)(`td`,{children:e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:e.total}),(0,u.jsx)(`td`,{rowSpan:yt?2:1,children:`—`}),(0,u.jsx)(`td`,{rowSpan:yt?2:1,children:`—`}),(0,u.jsx)(`td`,{rowSpan:yt?2:1,children:(0,u.jsx)(`b`,{children:yt?Tt:e.absent?0:e.total})}),(0,u.jsxs)(`td`,{rowSpan:yt?2:1,className:`transcript-grade-cell`,children:[(0,u.jsx)(`div`,{className:`grade-letter`,children:e.letter_grade}),(0,u.jsxs)(`div`,{className:`grade-gp`,children:[`GP `,e.gp.toFixed(2)]})]})]},e.code||e.subject_id);if(t===`108`)return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:`108`})}),(0,u.jsx)(`td`,{className:`text-left`,children:(0,u.jsx)(`b`,{children:`ENGLISH-II`})}),(0,u.jsx)(`td`,{children:e.absent?`অনুপস্থিত`:e.written!==``&&e.written!==null&&e.written!==void 0?e.written:e.total}),!yt&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`td`,{children:`—`}),(0,u.jsx)(`td`,{children:`—`}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.absent?0:e.total})}),(0,u.jsxs)(`td`,{className:`transcript-grade-cell`,children:[(0,u.jsx)(`div`,{className:`grade-letter`,children:e.letter_grade}),(0,u.jsxs)(`div`,{className:`grade-gp`,children:[`GP `,e.gp.toFixed(2)]})]})]})]},e.code||e.subject_id);let n=!!e.absent,r=n?`অনুপস্থিত`:e.written_max>0?e.written!==``&&e.written!==null&&e.written!==void 0?e.written:0:`—`,i=n?`অনুপস্থিত`:e.mcq_max>0?e.mcq!==``&&e.mcq!==null&&e.mcq!==void 0?e.mcq:0:`—`,a=n?`—`:e.practical_max>0?e.practical!==``&&e.practical!==null&&e.practical!==void 0?e.practical:0:`—`;return(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.code})}),(0,u.jsx)(`td`,{className:`text-left`,children:(0,u.jsx)(`b`,{children:ht(e)})}),(0,u.jsx)(`td`,{children:r}),(0,u.jsx)(`td`,{children:i}),(0,u.jsx)(`td`,{children:a}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:n?0:e.total})}),(0,u.jsxs)(`td`,{className:`transcript-grade-cell`,children:[(0,u.jsx)(`div`,{className:`grade-letter`,children:e.letter_grade}),(0,u.jsxs)(`div`,{className:`grade-gp`,children:[`GP `,e.gp.toFixed(2)]})]})]},e.code||e.subject_id)})})]}),(0,u.jsxs)(`div`,{className:`transcript-summary-box`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`summary-label`,children:`সর্বমোট প্রাপ্ত নম্বর`}),(0,u.jsx)(`div`,{className:`summary-val`,children:$.total_marks})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`summary-label`,children:`প্রাপ্ত শতকরা (%)`}),(0,u.jsxs)(`div`,{className:`summary-val`,children:[$.percentage,`%`]})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`summary-label`,children:`গ্রেড পয়েন্ট (GPA)`}),(0,u.jsx)(`div`,{className:`summary-val green-text`,children:$.gpa})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`summary-label`,children:`চূড়ান্ত লেটার গ্রেড`}),(0,u.jsx)(`div`,{className:`summary-val green-text`,children:$.final_grade})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`summary-label`,children:`ফলাফল স্ট্যাটাস`}),(0,u.jsx)(`div`,{className:`summary-val green-text status-text`,children:$.result_status})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`summary-label`,children:K&&N&&N!==`all`&&N!==`সকল বিভাগ`?`${N} মেধা স্থান`:`শ্রেণি মেধা স্থান`}),(0,u.jsx)(`div`,{className:`summary-val`,children:$.display_merit||$.dept_merit||$.merit?`${o($.display_merit||$.dept_merit||$.merit)} তম`:`—`})]})]})]}),(0,u.jsxs)(`div`,{className:`transcript-bottom-content`,children:[(0,u.jsxs)(`div`,{className:`transcript-signatures-zone ${ze?`four-columns`:`three-columns`}`,children:[(0,u.jsxs)(`div`,{className:`sig-column`,children:[(0,u.jsx)(`div`,{className:`sig-dots`,children:Ve}),(0,u.jsx)(`div`,{children:`শ্রেণি শিক্ষকের স্বাক্ষর`})]}),ze?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`sig-column`,children:[(0,u.jsx)(`div`,{className:`sig-dots`,children:Ve}),(0,u.jsx)(`div`,{children:`প্রস্তুতকারীর স্বাক্ষর`})]}),(0,u.jsxs)(`div`,{className:`sig-column`,children:[(0,u.jsx)(`div`,{className:`sig-dots`,children:Ve}),(0,u.jsx)(`div`,{children:`অভিভাবকের স্বাক্ষর`})]})]}):(0,u.jsxs)(`div`,{className:`sig-column`,children:[(0,u.jsx)(`div`,{className:`sig-dots`,children:Ve}),(0,u.jsx)(`div`,{children:Be})]}),(0,u.jsxs)(`div`,{className:`sig-column`,children:[(0,u.jsx)(`div`,{className:`sig-dots`,children:Ve}),(0,u.jsx)(`div`,{children:`প্রধান শিক্ষকের স্বাক্ষর ও সিলমোহর`})]})]}),(0,u.jsx)(`div`,{className:`transcript-seal-space`,style:{height:`52px`,margin:`6px 0 8px 0`}}),(0,u.jsxs)(`div`,{className:`transcript-footer-line`,children:[(0,u.jsxs)(`span`,{children:[`ফলাফল প্রকাশের তারিখ: `,o(new Date().toLocaleDateString(`bn-BD`)),` খ্রি.`]}),(0,u.jsxs)(`span`,{children:[`মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়, কালিহাতী, টাঙ্গাইল — কম্পিউটার প্রস্তুতকৃত `,Ue]})]})]})]}):(0,u.jsxs)(`div`,{className:`exam-card-form text-center`,children:[(0,u.jsx)(`h3`,{children:`📄 কোনো মার্কশিট তৈরি নেই`}),(0,u.jsx)(`p`,{children:`মার্কশিট দেখার জন্য আগে "ফলাফল প্রসেসিং" সম্পন্ন করুন।`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,onClick:ct,children:`🧮 Result Process চালান`})]})]}),y===`analysis`&&(0,u.jsx)(`div`,{className:`analysis-panel`,children:V?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`report-cards`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall?.students||0)}),(0,u.jsx)(`span`,{children:`পরীক্ষার্থী`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall?.passed||0)}),(0,u.jsx)(`span`,{children:`উত্তীর্ণ`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall?.failed||0)}),(0,u.jsx)(`span`,{children:`অকৃতকার্য`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsxs)(`b`,{children:[o(V.overall?.pass_rate||0),`%`]}),(0,u.jsx)(`span`,{children:`পাসের হার`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall?.avg_gpa||0)}),(0,u.jsx)(`span`,{children:`গড় GPA`})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:o(V.overall?.gpa5_count||0)}),(0,u.jsx)(`span`,{children:`GPA 5.0 (A+)`})]})]}),V.grade_distribution&&(0,u.jsxs)(`div`,{className:`exam-card-form`,style:{marginTop:`16px`},children:[(0,u.jsx)(`h4`,{children:`🎯 গ্রেড বণ্টন (Grade Distribution)`}),(0,u.jsx)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`,marginTop:`10px`},children:Object.entries(V.grade_distribution).map(([e,t])=>(0,u.jsxs)(`div`,{style:{background:`#f8fafc`,border:`1px solid #cbd5e1`,borderRadius:`8px`,padding:`8px 16px`,textAlign:`center`,minWidth:`80px`},children:[(0,u.jsxs)(`span`,{style:{fontSize:`13px`,color:`#64748b`,fontWeight:600},children:[`গ্রেড `,e]}),(0,u.jsxs)(`div`,{style:{fontSize:`18px`,fontWeight:800,color:e===`A+`?`#0b8050`:e===`F`?`#dc2626`:`#1e293b`},children:[o(t),` জন`]})]},e))})]}),(0,u.jsxs)(`div`,{className:`exam-card-table`,style:{marginTop:`16px`},children:[(0,u.jsxs)(`div`,{className:`card-header-styled`,children:[(0,u.jsx)(`h3`,{children:`বিষয়ভিত্তিক ফলাফল বিশ্লেষণ`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-text-action`,onClick:lt,children:`🔄 রিফ্রেশ`})]}),(0,u.jsx)(`div`,{className:`table-responsive-wrapper`,children:(0,u.jsxs)(`table`,{className:`modern-exam-table`,children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`th`,{children:`বিষয় কোড`}),(0,u.jsx)(`th`,{children:`বিষয়ের নাম`}),(0,u.jsx)(`th`,{children:`বিভাগ`}),(0,u.jsx)(`th`,{children:`গড় নম্বর`}),(0,u.jsx)(`th`,{children:`গড় %`}),(0,u.jsx)(`th`,{children:`উত্তীর্ণ`}),(0,u.jsx)(`th`,{children:`অকৃতকার্য`}),(0,u.jsx)(`th`,{children:`পাসের হার (Pass Rate)`})]})}),(0,u.jsx)(`tbody`,{children:(V.subjects||[]).map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`code-pill`,children:(0,u.jsx)(`b`,{children:e.code})})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{children:e.subject_name})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`sub-tag-compulsory`,children:e.department||`সাধারণ`})}),(0,u.jsx)(`td`,{children:o(e.avg_marks)}),(0,u.jsxs)(`td`,{children:[o(e.avg_percentage),`%`]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{className:`tab-pass-cell`,children:o(e.passed)})}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`b`,{className:e.failed>0?`tab-fail-cell`:`text-muted`,children:o(e.failed)})}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`b`,{children:[o(e.pass_rate),`%`]})})]},e.code))})]})})]})]}):(0,u.jsxs)(`div`,{className:`exam-card-form text-center`,children:[(0,u.jsx)(`h3`,{children:`📊 ফলাফল বিশ্লেষণ প্রস্তুত করুন`}),(0,u.jsx)(`p`,{children:`নির্বাচিত পরীক্ষা ও শ্রেণির সার্বিক ফলাফল এবং বিষয়ভিত্তিক পরিসংখ্যান দেখতে নিচের বাটনে ক্লিক করুন।`}),(0,u.jsx)(`button`,{type:`button`,className:`btn-modern-primary`,onClick:lt,children:`ফলাফল বিশ্লেষণ প্রস্তুত করুন`})]})})]})}export{_ as t};