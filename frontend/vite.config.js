import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['school-logo.png', 'school-building.jpg'],
      manifest: {
        name: 'মগড়া পালস্ ইউনিয়ন উচ্চ বিদ্যালয়',
        short_name: 'মগড়া স্কুল',
        description: 'Smart School Management ও Digital Learning Platform',
        theme_color: '#0b6b43',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/school-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/school-logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normId = id.replace(/\\/g, '/');
          if (normId.includes('node_modules/pptxgenjs')) return 'vendor-pptx';
          if (normId.includes('node_modules/qrcode')) return 'vendor-qrcode';
          if (normId.includes('node_modules/react') || normId.includes('node_modules/react-dom') || normId.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (normId.includes('mockData')) return 'data-mock';
          if (normId.includes('questionBankData')) return 'data-question-bank';
          if (normId.includes('curriculumData')) return 'data-curriculum';
          if (normId.includes('SubmenuDetailModal')) return 'panel-submenu-modal';
          if (normId.includes('InstitutionalInfoAdminPanel')) return 'panel-institutional-admin';
          if (normId.includes('FinancePanel')) return 'panel-finance';
          if (normId.includes('QuestionBankPanel')) return 'panel-question-bank';
          if (normId.includes('SportsCultureAdminEngine')) return 'panel-sports-culture';
          if (normId.includes('LibraryPanel')) return 'panel-library';
          if (normId.includes('DebateClubMasterSection')) return 'panel-debate-club';
          if (normId.includes('IctClubMasterSection')) return 'panel-ict-club';
          if (normId.includes('ScienceClubMasterSection')) return 'panel-science-club';
          if (normId.includes('ResultPanel')) return 'panel-result';
          if (normId.includes('RoutinePanel')) return 'panel-routine';
          if (normId.includes('GalleryMasterAdminPanel')) return 'panel-gallery-admin';
          if (normId.includes('GalleryMasterModalSection')) return 'panel-gallery-modal';
          if (normId.includes('AdmissionPanel')) return 'panel-admission';
          if (normId.includes('AttendancePanel')) return 'panel-attendance';
          if (normId.includes('StudentMasterAdminPanel')) return 'panel-student-admin';
          if (normId.includes('StaffMasterAdminPanel')) return 'panel-staff-admin';
          if (normId.includes('LanguageLiteratureClubSection')) return 'panel-literature-club';
          if (normId.includes('SportsCultureModernSection')) return 'panel-sports-modern';
          if (normId.includes('EServiceCenterAdminPanel')) return 'panel-eservice-admin';
          if (normId.includes('EServiceCenterModalSection')) return 'panel-eservice-modal';
        }
      }
    }
  }
});
