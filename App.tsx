/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  ArrowLeft,
  Utensils,
  Users,
  Star,
  ListChecks,
  Menu,
  X,
  Bookmark
} from 'lucide-react';

interface Prayer {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  source: string;
  reason: string;
}

interface TutorialStep {
  title: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  prayers: Prayer[];
  tutorial?: TutorialStep[];
}

const PRAYER_DATA: Category[] = [
  {
    id: 'pra-nikah',
    name: 'Bab 1: Pra-Nikah',
    description: 'Doa menerima jodoh & rezeki dari Allah.',
    icon: <Sparkles className="w-5 h-5" />,
    prayers: [
      {
        id: 'dunia-akhirat',
        title: 'Doa Kebaikan Dunia & Akhirat',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        latin: 'Rabbana atina fid-dunya hasanah, wafil-akhirati hasanah, waqina \'adhaban-nar.',
        translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari azab neraka.',
        source: 'QS. Al-Baqarah: 201',
        reason: 'Imam Ath-Thabari menjelaskan bahwa "kebaikan di dunia" yang paling utama dimaksud oleh para salaf adalah istri sholehah yang baik. Doa universal untuk memohon pasangan hidup yang berkah.'
      },
      {
        id: 'pasangan-keturunan',
        title: 'Doa Pasangan & Keturunan',
        arabic: 'رَبِّ هَبْ لِي مِن لَّدُنكَ زَوْجَةً طَيِّبَةً لَكَ تَرْضَاهَا وَلِي تَرْضَاهَا وَارْزُقْنِي مِنْهَا ذُرِّيَّةً طَيِّبَةً بِرَحْمَتِكَ إِنَّكَ سَمِيعُ الدُّعَاءِ',
        latin: 'Rabbi hab li min ladunka zaujathan tayyibatan laka tardhaha wa li ardhabi warzuqni minha dzurriyyatan tayyibatan bi-rahmatika innaka sami\'ud-du\'a.',
        translation: 'Ya Tuhanku, anugerahkanlah kepadaku dari sisi-Mu seorang istri yang baik, yang Engkau ridhai dan yang dia ridhai (terhadapku), dan anugerahkanlah kepadaku dari padanya keturunan yang baik. Dengan rahmat-Mu, sesungguhnya Engkau Maha Mendengar doa.',
        source: 'Adaptasi QS. Ali Imran: 38',
        reason: 'Diadaptasi dari doa Nabi Zakariya AS untuk memohon pasangan dan keturunan yang sholeh/sholehah yang membawa keridhaan Allah.'
      },
      {
        id: 'jodoh-baik',
        title: 'Doa Memohon Jodoh yang Baik',
        arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
        latin: 'Rabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrata a’yun, waj’alnaa lil-muttaqiina imaamaa.',
        translation: 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan yang menjadi penyejuk hati, serta jadikanlah kami pemimpin bagi orang-orang yang bertakwa.',
        source: 'QS. Al-Furqan: 74',
        reason: 'Doa ini memohon pasangan yang tidak hanya baik secara fisik, tapi juga menjadi penyejuk hati (qurrata a\'yun) dan pemimpin bagi orang bertakwa.'
      },
      {
        id: 'kemudahan-urusan',
        title: 'Doa Memohon Kemudahan Urusan',
        arabic: 'اَللَّهُمَّ يَسِّرْ وَلَا تُعَسِّرْ، وَتَمِّمْ بِالْخَيْرِ',
        latin: 'Allāhumma yassir wa lā tu’assir, wa tammim bil khair.',
        translation: 'Ya Allah, mudahkanlah urusanku, jangan Engkau persulit, dan sempurnakanlah semuanya dengan kebaikan.',
        source: 'Doa Ma\'tsur',
        reason: 'Dibaca agar segala proses menuju pernikahan (taaruf, khitbah, akad) dimudahkan oleh Allah tanpa hambatan yang berarti.'
      }
    ]
  },
  {
    id: 'istikharah',
    name: 'Bab 2: Istikharah',
    description: 'Ikhtiar batin untuk menyerahkan pilihan kepada Allah.',
    icon: <ListChecks className="w-5 h-5" />,
    tutorial: [
      { title: 'Niat', description: 'Berniat di dalam hati untuk melakukan shalat sunnah istikharah dua rakaat karena Allah Ta\'ala.' },
      { title: 'Rakaat Pertama', description: 'Setelah Al-Fatihah, disunnahkan membaca surat Al-Kafirun.' },
      { title: 'Rakaat Kedua', description: 'Setelah Al-Fatihah, disunnahkan membaca surat Al-Ikhlas.' },
      { title: 'Berdoa', description: 'Setelah salam, bacalah doa istikharah dengan khusyuk sambil menyebutkan nama calon atau urusan yang dimaksud.' },
      { title: 'Hasil', description: 'Istikharah yang benar akan membuat hati merasa tenang dan mantap (tidak ada keraguan lagi) untuk melanjutkan.' }
    ],
    prayers: [
      {
        id: 'doa-istikharah',
        title: 'Doa Istikharah',
        arabic: 'اَللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ، اَللَّهُمَّ فَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ (Sebutkan nama calon) خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ',
        latin: 'Allahumma inni astakhiiruka bi\'ilmika, wa astaqdiruka biqudratika, wa as\'aluka min fadhlikal-\'azhiim. Fa innaka taqdiru wa laa aqdiru, wa ta\'lamu wa laa a\'lamu, wa anta \'allaamul-ghuyuub. Allahumma fa-in kunta ta\'lamu anna hadzal-amra (sebutkan nama) khairun lii fii diinii wa ma\'aasyii wa \'aaqibati amrii, faqdurhu lii wa yassirhu lii tsumma baarik lii fiih. Wa in kunta ta\'lamu anna hadzal-amra syarrun lii fii diinii wa ma\'aasyii wa \'aaqibati amrii, fasrifhu \'annii wasrifnii \'anhu, waqdur liyal-khaira haitsu kaana tsumma ardhanii bih.',
        translation: 'Ya Allah, sesungguhnya aku memohon pilihan yang baik kepada-Mu dengan ilmu-Mu, dan aku memohon kekuatan kepada-Mu dengan kekuasaan-Mu, dan aku memohon karunia-Mu yang agung. Sesungguhnya Engkau Maha Kuasa sedangkan aku tidak berkuasa, Engkau Maha Mengetahui sedangkan aku tidak mengetahui, dan Engkau Maha Mengetahui perkara yang gaib. Ya Allah, jika Engkau mengetahui bahwa urusan ini baik bagiku dalam agama, kehidupan, and akhirat urusanku, maka takdirkanlah dia untukku dan mudahkanlah, lalu berkahilah dia untukku. Dan jika Engkau mengetahui bahwa urusan ini buruk bagiku dalam agama, kehidupan, dan akhirat urusanku, maka palingkanlah dia dariku dan palingkanlah aku darinya, dan takdirkanlah kebaikan untukku di mana pun kebaikan itu berada, lalu jadikanlah aku ridha terhadapnya.',
        source: 'HR. Bukhari No. 6382',
        reason: 'Nabi ﷺ mengajarkan doa ini untuk semua urusan. Keistikharaan yang benar akan membuat hatimu merasa tenang dan mantap untuk melanjutkan ke jenjang akad.'
      },
      {
        id: 'ketenangan-hati',
        title: 'Doa Ketenangan Hati & Kelapangan',
        arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
        latin: 'Rabbi shrah li shadri, wa yassir li amri, wahlul ‘uqdatan min lisaani yafqahuu qawli.',
        translation: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku agar mereka memahami perkataanku.',
        source: 'QS. Thaha: 25–28',
        reason: 'Doa Nabi Musa AS ini sangat baik dibaca agar hati tenang, tidak gugup saat proses taaruf atau akad, dan lisan lancar saat berbicara.'
      }
    ]
  },
  {
    id: 'akad-nikah',
    name: 'Bab 3: Akad Nikah',
    description: 'Doa saat ijab kabul, momen sakral yang disaksikan malaikat.',
    icon: <BookOpen className="w-5 h-5" />,
    prayers: [
      {
        id: 'keridhaan-keberkahan',
        title: 'Doa Keridhaan & Keberkahan',
        arabic: 'اَللَّهُمَّ إِنِّي أَسْتَخِيرُكَ حُسْنَ الْعَاقِبَةِ، وَأَعُوذُ بِكَ مِنْ شَرِّ أَوَّلِهِ وَآخِرِهِ، اَللَّهُمَّ اجْعَلْ هَذَا الزَّوَاجَ مَبَارَكًا، وَاجْعَلْ بَيْنَنَا أَلْفَةً وَرَحْمَةً، وَارْزُقْنَا ذُرِّيَّةً طَيِّبَةً',
        latin: 'Allahumma inni as-aluka husnal-\'aaqibah, wa a\'udzubika min syarri awwalihi wa aakhih. Allahummaj\'al hazaz-zawaja mubaarakan, waj\'al bainana alfafatan wa rahmah, warzuqna dzurriyyatan tayyibah.',
        translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan akhir (husnul khatimah), dan aku berlindung kepada-Mu dari keburukan awal dan akhirnya (pernikahan ini). Ya Allah, jadikanlah pernikahan ini penuh keberkahan, jadikanlah di antara kami rasa cinta (keakraban) dan kasih sayang, dan anugerahkanlah kepada kami keturunan yang baik.',
        source: 'Gabungan Dalil Hadits',
        reason: 'Disusun dari doa Nabi ﷺ saat memulai urusan penting (HR. Abu Dawud), doa Nabi Ibrahim AS (QS. As-Shaffat: 102), dan doa kasih sayang (QS. Ar-Rum: 21).'
      }
    ]
  },
  {
    id: 'pasca-nikah',
    name: 'Bab 4: Pasca-Nikah',
    description: 'Adab malam pertama dan kehidupan sehari-hari.',
    icon: <Users className="w-5 h-5" />,
    prayers: [
      {
        id: 'malam-pertama',
        title: 'Doa Malam Pertama',
        arabic: 'بِسْمِ اللَّهِ، اَللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا',
        latin: 'Bismillah, Allahumma jannibnasy-syaithaan, wa jannibisy-syaithaana maa razaqtana.',
        translation: 'Dengan menyebut nama Allah. Ya Allah, jauhkanlah kami dari setan, dan jauhkanlah setan dari rezeki (keturunan) yang Engkau anugerahkan kepada kami.',
        source: 'HR. Bukhari & Muslim',
        reason: 'Kunci agar anak yang lahir terhindar dari gangguan setan dan menjadi anak yang sholeh.'
      },
      {
        id: 'doa-hubungan-lengkap',
        title: 'Doa Sebelum Berhubungan (Lengkap)',
        arabic: 'اَللَّهُمَّ اجْعَلْ لِي فِيهَا وَلَدًا طَيِّبًا، إِنْ قَضَيْتَ فِيهَا وَلَدًا فَاجْعَلْهُ سَوِيًّا، وَلَا تَجْعَلْ لِلشَّيْطَانِ فِيهِ شِرْكًا وَلَا نَصِيبًا',
        latin: 'Allahummaj\'al lii fiihaa waladan thoyyibaa, in qadhaita fiihaa waladan faj\'alhu sawiyyan, wa laa taj\'al lisy-syaithaani fiihi syirkan wa laa nashiiban.',
        translation: 'Ya Allah, jadikanlah untukku darinya (istrinya) anak yang baik. Jika Engkau takdirkan darinya anak, maka jadikanlah anak tersebut sempurna (sehat jasmani dan rohani), dan janganlah Engkau jadikan setan punya bagian dan hak padanya.',
        source: 'Amalan Ulama Salaf',
        reason: 'Ikhtiar agar keturunan yang lahir adalah anak yang sehat, sempurna, dan terjaga keislamannya.'
      },
      {
        id: 'menyenangkan-hati',
        title: 'Doa Menyenangkan Hati Pasangan',
        arabic: 'اَللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا وَاهْدِنَا سُبُلَ السَّلَامِ',
        latin: 'Allahumma allif baina quluubina wa ashlih dzaata bainina wa hdina subulas-salaam.',
        translation: 'Ya Allah, lembutkanlah hati-hati kami di antara satu sama lain, perbaikilah hubungan di antara kami, dan tunjukilah kami ke jalan-jalan keselamatan.',
        source: 'HR. Ath-Thabrani',
        reason: 'Sangat ampuh untuk dibaca saat ada ketegangan atau untuk menambah kecintaan suami istri di rumah.'
      }
    ]
  }
];

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSelectedPrayer(null);
    setShowTutorial(false);
  };

  const handlePrayerClick = (prayer: Prayer) => {
    setSelectedPrayer(prayer);
    setShowTutorial(false);
  };

  const resetSelection = () => {
    if (selectedPrayer || showTutorial) {
      setSelectedPrayer(null);
      setShowTutorial(false);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <AnimatePresence mode="wait">
        {!isCoverOpen ? (
          /* Cover Page */
          <motion.div
            key="cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-md aspect-[3/4] bg-olive rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center relative overflow-hidden border-8 border-white/10"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full" />
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 relative z-10"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-white/70 uppercase tracking-[0.3em] text-xs font-bold">Buku Saku</h2>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                  Mahkamah Cinta
                </h1>
              </div>
              
              <div className="h-[1px] w-12 bg-white/30 mx-auto" />
              
              <p className="text-white/60 text-sm font-serif italic leading-relaxed">
                Panduan Lengkap Doa & Adab Menuju Pernikahan Berkah Berdasarkan Al-Qur'an & Hadits
              </p>
              
              <button
                onClick={() => setIsCoverOpen(true)}
                className="mt-12 px-10 py-4 bg-white text-olive rounded-full font-bold shadow-xl hover:bg-paper transition-all active:scale-95 flex items-center gap-3 mx-auto"
              >
                Buka Buku
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
            
            <div className="absolute bottom-8 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              Edisi Calon Pengantin • 2026
            </div>
          </motion.div>
        ) : (
          /* Main Content (Pocket Book Interface) */
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-2xl min-h-[80vh] book-page rounded-[2.5rem] flex flex-col relative overflow-hidden"
          >
            {/* Sidebar Rail (Pocket Book Detail) */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-olive/10" />
            
            {/* Header */}
            <header className="px-8 py-6 flex items-center justify-between border-b border-olive/5">
              <div className="flex items-center gap-4">
                {(selectedCategory || selectedPrayer || showTutorial) ? (
                  <button 
                    onClick={resetSelection}
                    className="p-2 hover:bg-olive/5 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-olive" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsCoverOpen(false)}
                    className="p-2 hover:bg-olive/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-olive" />
                  </button>
                )}
                <h2 className="font-serif font-bold text-olive text-lg">Mahkamah Cinta</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-olive" />
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!selectedCategory ? (
                  /* Table of Contents */
                  <motion.div 
                    key="toc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-olive/40">Daftar Isi</h3>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink">Pilih Tahapan</h2>
                    </div>

                    <div className="grid gap-4">
                      {PRAYER_DATA.map((cat, idx) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat)}
                          className="group flex items-center justify-between p-6 bg-white/50 border border-olive/10 rounded-3xl hover:bg-white hover:shadow-lg hover:border-olive/30 transition-all text-left"
                        >
                          <div className="flex items-center gap-6">
                            <span className="font-serif italic text-olive/30 text-2xl">0{idx + 1}</span>
                            <div>
                              <h4 className="text-lg font-serif font-bold text-ink">{cat.name}</h4>
                              <p className="text-xs text-olive/60 mt-1">{cat.description}</p>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-olive/5 flex items-center justify-center group-hover:bg-olive group-hover:text-white transition-all">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : !selectedPrayer && !showTutorial ? (
                  /* Prayer List */
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest font-bold text-olive/40">{selectedCategory.name}</span>
                      <h2 className="text-3xl font-serif font-bold text-ink leading-tight">{selectedCategory.description}</h2>
                    </div>

                    {selectedCategory.tutorial && (
                      <button
                        onClick={() => setShowTutorial(true)}
                        className="w-full p-8 bg-olive rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-olive/20 hover:scale-[1.02] transition-all"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-serif font-bold text-lg">Panduan Shalat Istikharah</h4>
                            <p className="text-xs text-white/60">Langkah & Adab Ibadah</p>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}

                    <div className="grid gap-3">
                      {selectedCategory.prayers.map((prayer) => (
                        <button
                          key={prayer.id}
                          onClick={() => handlePrayerClick(prayer)}
                          className="group flex items-center justify-between p-5 bg-white/40 border border-olive/5 rounded-2xl hover:bg-white hover:border-olive/20 transition-all text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-olive/20 group-hover:bg-olive transition-colors" />
                            <span className="font-serif font-bold text-ink">{prayer.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-olive/30" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : showTutorial ? (
                  /* Tutorial View */
                  <motion.div 
                    key="tutorial"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-10"
                  >
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center mx-auto">
                        <ListChecks className="w-6 h-6 text-olive" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-ink">Tata Cara Istikharah</h2>
                    </div>

                    <div className="space-y-6 relative">
                      <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-olive/10" />
                      {selectedCategory?.tutorial?.map((step, idx) => (
                        <div key={idx} className="relative flex gap-6 pl-2">
                          <div className="w-10 h-10 shrink-0 rounded-full bg-paper border border-olive/20 flex items-center justify-center font-serif font-bold text-olive z-10">
                            {idx + 1}
                          </div>
                          <div className="pt-1 space-y-1">
                            <h4 className="font-serif font-bold text-ink text-lg">{step.title}</h4>
                            <p className="text-sm text-olive/70 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setShowTutorial(false)}
                      className="w-full py-4 bg-olive text-white rounded-full font-bold shadow-lg shadow-olive/10 hover:bg-olive/90 transition-all"
                    >
                      Kembali ke Doa
                    </button>
                  </motion.div>
                ) : (
                  /* Prayer Detail */
                  <motion.div 
                    key="detail"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="space-y-10"
                  >
                    <div className="text-center space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-olive/40">{selectedCategory?.name}</span>
                      <h2 className="text-3xl font-serif font-bold text-ink">{selectedPrayer?.title}</h2>
                    </div>

                    <div className="space-y-12">
                      {/* Arabic Card */}
                      <div className="bg-white/60 border border-olive/10 rounded-[2rem] p-8 md:p-12 shadow-sm">
                        <p className="font-arabic text-3xl md:text-4xl leading-[2] text-ink text-right dir-rtl">
                          {selectedPrayer?.arabic}
                        </p>
                      </div>

                      {/* Latin & Translation */}
                      <div className="grid gap-8 px-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-[1px] w-4 bg-gold" />
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-gold">Latin</h4>
                          </div>
                          <p className="text-olive italic font-serif text-xl leading-relaxed">
                            "{selectedPrayer?.latin}"
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-[1px] w-4 bg-olive/30" />
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-olive/40">Artinya</h4>
                          </div>
                          <p className="text-ink leading-relaxed text-lg">
                            {selectedPrayer?.translation}
                          </p>
                        </div>
                      </div>

                      {/* Source Info */}
                      <div className="bg-olive/5 rounded-3xl p-6 flex gap-4 border border-olive/10">
                        <Info className="w-5 h-5 text-olive shrink-0 mt-1" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-olive uppercase tracking-wider">Sumber & Hikmah</p>
                          <p className="text-sm text-olive/80 leading-relaxed">
                            <span className="font-bold">{selectedPrayer?.source}:</span> {selectedPrayer?.reason}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedPrayer(null)}
                      className="w-full py-4 bg-ink text-white rounded-full font-bold shadow-xl hover:bg-ink/90 transition-all flex items-center justify-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Selesai Membaca
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Page Numbering (Pocket Book Aesthetic) */}
            <footer className="px-8 py-6 flex items-center justify-center border-t border-olive/5">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-olive/20">
                <span>Mahkamah</span>
                <div className="w-1 h-1 rounded-full bg-olive/20" />
                <span>Cinta</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
