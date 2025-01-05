// // // booking-section.js
// // import { calculateTotalPrice, updatePeopleCount, processBooking } from './utils.js';
// // import { updateCartCount } from './api.js';
// // import { loadOptionsData, createBookingSection } from './render.js';

// // class BookingSection extends HTMLElement {
// //     constructor() {
// //         super();
// //         this.selectedOptions = { duration: 0, hotel: 0, meal: 0, transport: 0 };
// //         this.peopleCount = { adults: 0, children: 0 };
// //         this.attachShadow({ mode: 'open' });
// //     }

// //     connectedCallback() {
// //         this.render();
// //         this.attachEventListeners();
// //         loadOptionsData.call(this);
// //     }
// get jsonData() {
//     return {
//         "travelDirections": [
//             {
//                 "direction": "khustai",
//                 "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d344495.5120359433!2d105.67448804439742!3d47.580021813762855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5d97378546aaaaab%3A0xf5caa7e8c8d99888!2zS2h1c3RhaSBNb3VudGFpbnMgUm9hZCDQpdGD0YHRgtCw0LnQvSDQndGD0YDRg9GDLCBBcmdhbGFudA!3m2!1d47.7638453!2d105.87903469999999!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735549715549!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000 },
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "hyrgas",
//                 "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d540978.3158657287!2d93.03970271611166!3d49.02575313254163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5d464605dc624d57%3A0x949c1a4c9efa53f6!2sKhyargas%20Lake!3m2!1d49.1974631!2d93.2686011!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735549911910!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "hongoriinels",
//                 "map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.518123785995!2d102.33231961236363!3d43.74133637097764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune!5e0!3m2!1sen!2smn!4v1734774627577!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000 },
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "hiid",
//                 "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d397388.3409138745!2d102.62869278008473!3d47.00141133504673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5d9cf209068cf281%3A0x9e4e07fa516f844f!2z0K3RgNC00Y3QvdGNINCX0YPRgyDRhdC40LnQtCwgS2hhcmtob3Jpbg!3m2!1d47.2012243!2d102.8409825!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735550033797!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "orkhon",
//                 "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d310042.56570091203!2d102.5279856408695!3d47.42628148261017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x5d9c564457b1ae03%3A0x357b12a301972f13!2sOrkhon%20Valley%20Natural%20and%20Historical%20Reserve%2C%20FP2H%2B5F5%2C%20Ovorkhangai!3m2!1d47.4503864!2d102.7287312!4m0!5e0!3m2!1sen!2smn!4v1735550577048!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000,"images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"]},
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "saihan",
//                 "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d198576.7140654123!2d105.9240070711325!3d50.216228937787285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5da49bdb656b5089%3A0x897772a5cf3454b!2z0KHQsNC50YXQsNC90Ysg0YXTqdGC06nQuywgU8O8a2hiYWF0YXI!3m2!1d50.306587199999996!2d106.1525812!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735550189177!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "Altai",
//                 "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d48797.1845910883!2d87.79529301362889!3d49.14709928446087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x42b71cf6a20f0fdb%3A0x1ab9d9eaab14e452!2sTavan%20Bogd%2C%20Burqin%20County%2C%20Altay%20Prefecture%2C%20Bayan-%C3%96lgii!3m2!1d49.145876099999995!2d87.8188788!4m0!5e0!3m2!1sen!2smn!4v1735550354644!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 400000}
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "huhnuur",
//                 "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d86256.69159475932!2d98.46753419615493!3d47.4992320863081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x5d6fdebffe6a0009%3A0xa86c0390155dbf66!2z0KXTqdGFINCd0YPRg9GA!3m2!1d47.4992616!2d98.5499348!4m0!5e0!3m2!1sen!2smn!4v1735550408753!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "direction": "huvsgul",
//                 "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d699517.6245802691!2d100.44019653659726!3d51.03130646745427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x5d0e5d1ba6b92eab%3A0xd9305b7b011f9111!2z0KXTqdCy0YHQs9Op0Lsg0J3Rg9GD0YA!3m2!1d51.1228269!2d100.5490739!4m0!5e0!3m2!1sen!2smn!4v1735550487716!5m2!1sen!2smn",
//                 "bookingSections": [
//                     {
//                         "title": "📅 Аяллын Хугацаа",
//                         "id": "duration",
//                         "options": [
//                             { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000 },
//                             { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
//                         ]
//                     },
//                     {
//                         "title": "🏨 Байрны Сонголт",
//                         "id": "hotel",
//                         "options": [
//                             { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
//                             { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
//                             { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🍽️ Хоолны Сонголт",
//                         "id": "meal",
//                         "options": [
//                             { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
//                             { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
//                         ]
//                     },
//                     {
//                         "title": "🚌 Тээврийн Хэрэгсэл",
//                         "id": "transport",
//                         "options": [
//                             { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
//                             { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
//                         ]
//                     }
//                 ]
//             },
//         ]
//     };
// }
// //     render() {
// //         const direction = this.getAttribute('direction');
// //         const selectedDirection = this.jsonData.travelDirections.find(item => item.direction === direction);
// //         if (!selectedDirection) {
// //             console.error('Direction not found');
// //             return;
// //         }

// //         this.optionsData = selectedDirection;
// //         this.shadowRoot.innerHTML = `
// //             <link rel="stylesheet" href="./css/styles.css">
// //             <style>
// //                 .option-card { cursor: pointer; }
// //                 .booking-selection { display: none; }
// //             </style>
// //             <section class="package-details">
// //                 <div class="package-columns">
// //                     <div class="map">
// //                         <iframe
// //                             src="${this.optionsData.map}"
// //                             width="100%" height="450" style="border:0;" allowfullscreen=""
// //                             loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
// //                     </div>
// //                     <div class="booking-container">
// //                         ${this.optionsData.bookingSections.map(section => createBookingSection(section.title, section.id, section.options)).join('')}
// //                         <div class="booking-section">
// //                             <h2>👨‍👩‍👧‍👦 Хүмүүсийн Тоо</h2>
// //                             <div class="option-grid">
// //                                 <div>
// //                                     <label>Насанд Хүрэгчид:</label>
// //                                     <input type="number" id="adult-count" value="0" min="0" class="input-number" />
// //                                 </div>
// //                                 <div>
// //                                     <label>Хүүхэд:</label>
// //                                     <input type="number" id="child-count" value="0" min="0" class="input-number" />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div class="total-price" id="totalPrice">Нийт үнэ: 0₮</div>
// //                         <button id="bookBtn" class="booking-button">Захиалах</button>
// //                     </div>
// //                 </div>
// //             </section>
// //         `;
// //     }

// //     attachEventListeners() {
// //         this.shadowRoot.querySelectorAll('.option-card').forEach(card => {
// //             card.addEventListener('click', event => this.handleOptionCardClick(event));
// //         });

// //         this.shadowRoot.getElementById('adult-count').addEventListener('input', () => updatePeopleCount.call(this));
// //         this.shadowRoot.getElementById('child-count').addEventListener('input', () => updatePeopleCount.call(this));
// //         this.shadowRoot.getElementById('bookBtn').addEventListener('click', () => processBooking.call(this));
// //     }

// //     handleOptionCardClick(event) {
// //         const card = event.currentTarget;
// //         const type = card.getAttribute('data-type');
// //         const price = parseInt(card.getAttribute('data-price')) || 0;

// //         this.shadowRoot.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(otherCard => {
// //             otherCard.classList.remove('selected');
// //             const imgSection = otherCard.querySelector('.booking-selection');
// //             if (imgSection) imgSection.style.display = 'none';
// //         });

// //         card.classList.add('selected');
// //         const imgSection = card.querySelector('.booking-selection');
// //         if (imgSection) imgSection.style.display = 'block';

// //         this.selectedOptions[type] = price;
// //         calculateTotalPrice.call(this);
// //     }
// // }

// // customElements.define('booking-section', BookingSection);
