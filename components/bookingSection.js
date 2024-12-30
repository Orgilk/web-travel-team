class BookingSection extends HTMLElement {
    constructor() {
        super();
        this.selectedOptions = { duration: 0, hotel: 0, meal: 0, transport: 0 };
        this.peopleCount = { adults: 0, children: 0 };
        this.attachShadow({ mode: 'open' }); // Encapsulated Shadow DOM
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
        this.loadOptionsData();

        this.addEventListeners();
    }
    //json data ashiglaj zahialgiin form-n datag buh heseg neg burchlen bichihgui, component-n attribut uurchlugduhud wc-dee uurchlult ni haragdana
    get jsonData() {
        return {
            "travelDirections": [
                {
                    "direction": "khustai",
                    "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d344495.5120359433!2d105.67448804439742!3d47.580021813762855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5d97378546aaaaab%3A0xf5caa7e8c8d99888!2zS2h1c3RhaSBNb3VudGFpbnMgUm9hZCDQpdGD0YHRgtCw0LnQvSDQndGD0YDRg9GDLCBBcmdhbGFudA!3m2!1d47.7638453!2d105.87903469999999!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735549715549!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа K",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000, "images": ["./assets/huwsgul.jpg", "./assets/huwsgul.jpg", "./assets/huwsgul.jpg"] },
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000, "images": ["./assets/huwsgul.jpg", "./assets/huwsgul.jpg", "./assets/huwsgul.jpg"] }
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "hyrgas",
                    "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d540978.3158657287!2d93.03970271611166!3d49.02575313254163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5d464605dc624d57%3A0x949c1a4c9efa53f6!2sKhyargas%20Lake!3m2!1d49.1974631!2d93.2686011!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735549911910!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа hyrgas",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000, "images": ["./assets/huwsgul.jpg", "./assets/huwsgul.jpg", "./assets/huwsgul.jpg"] },
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000, "images": ["./assets/huwsgul.jpg", "./assets/huwsgul.jpg", "./assets/huwsgul.jpg"] }
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "hongoriinels",
                    "map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.518123785995!2d102.33231961236363!3d43.74133637097764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune!5e0!3m2!1sen!2smn!4v1734774627577!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000 },
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "hiid",
                    "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d397388.3409138745!2d102.62869278008473!3d47.00141133504673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5d9cf209068cf281%3A0x9e4e07fa516f844f!2z0K3RgNC00Y3QvdGNINCX0YPRgyDRhdC40LnQtCwgS2hhcmtob3Jpbg!3m2!1d47.2012243!2d102.8409825!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735550033797!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "orkhon",
                    "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d310042.56570091203!2d102.5279856408695!3d47.42628148261017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x5d9c564457b1ae03%3A0x357b12a301972f13!2sOrkhon%20Valley%20Natural%20and%20Historical%20Reserve%2C%20FP2H%2B5F5%2C%20Ovorkhangai!3m2!1d47.4503864!2d102.7287312!4m0!5e0!3m2!1sen!2smn!4v1735550577048!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000},
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000 },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "saihan",
                    "map": "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d198576.7140654123!2d105.9240070711325!3d50.216228937787285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x5da49bdb656b5089%3A0x897772a5cf3454b!2z0KHQsNC50YXQsNC90Ysg0YXTqdGC06nQuywgU8O8a2hiYWF0YXI!3m2!1d50.306587199999996!2d106.1525812!4m5!1s0x36299def8a85d503%3A0x9e3036957f8f8260!2sKhongor%20Sand%20Dune%20%C3%96mn%C3%B6govi!3m2!1d43.7413364!2d102.3348999!5e0!3m2!1sen!2smn!4v1735550189177!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "Altai",
                    "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d48797.1845910883!2d87.79529301362889!3d49.14709928446087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x42b71cf6a20f0fdb%3A0x1ab9d9eaab14e452!2sTavan%20Bogd%2C%20Burqin%20County%2C%20Altay%20Prefecture%2C%20Bayan-%C3%96lgii!3m2!1d49.145876099999995!2d87.8188788!4m0!5e0!3m2!1sen!2smn!4v1735550354644!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 400000}
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "huhnuur",
                    "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d86256.69159475932!2d98.46753419615493!3d47.4992320863081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x5d6fdebffe6a0009%3A0xa86c0390155dbf66!2z0KXTqdGFINCd0YPRg9GA!3m2!1d47.4992616!2d98.5499348!4m0!5e0!3m2!1sen!2smn!4v1735550408753!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000},
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000}
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
                {
                    "direction": "huvsgul",
                    "map": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d699517.6245802691!2d100.44019653659726!3d51.03130646745427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x5d0e5d1ba6b92eab%3A0xd9305b7b011f9111!2z0KXTqdCy0YHQs9Op0Lsg0J3Rg9GD0YA!3m2!1d51.1228269!2d100.5490739!4m0!5e0!3m2!1sen!2smn!4v1735550487716!5m2!1sen!2smn",
                    "bookingSections": [
                        {
                            "title": "📅 Аяллын Хугацаа",
                            "id": "duration",
                            "options": [
                                { "text": "3 өдөр 2 шөнө", "desc": "Үндсэн хөтөлбөр", "price": 300000 },
                                { "text": "5 өдөр 4 шөнө", "desc": "Өргөтгөсөн хөтөлбөр", "price": 250000 }
                            ]
                        },
                        {
                            "title": "🏨 Байрны Сонголт",
                            "id": "hotel",
                            "options": [
                                { "text": "Стандарт Байр", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/ger.jpg", "./assets/ger.jpg", "./assets/ger.jpg"] },
                                { "text": "Делюкс Байр", "desc": "Тав тухтай өрөө", "price": 100000, "images": ["./assets/standart.jpg", "./assets/standart1.jpg", "./assets/standart3.jpg"] },
                                { "text": "VIP Байр", "desc": "Бүх төрлийн үйлчилгээтэй", "price": 150000, "images": ["./assets/delux.jpg", "./assets/delux1.jpg", "./assets/delux.jpg"] }
                            ]
                        },
                        {
                            "title": "🍽️ Хоолны Сонголт",
                            "id": "meal",
                            "options": [
                                { "text": "Стандарт Хоол", "desc": "Өдөрт 3 удаа", "price": 25000, "images": ["./assets/hool25.jpg", "./assets/hool25_.jpg", "./assets/tsuivan.jpg"] },
                                { "text": "VIP Хоол", "desc": "Тусгай цэс", "price": 50000, "images": ["./assets/horhog.jpg", "./assets/huushuur.jpg", "./assets/horhog.jpg"] }
                            ]
                        },
                        {
                            "title": "🚌 Тээврийн Хэрэгсэл",
                            "id": "transport",
                            "options": [
                                { "text": "Автобус", "desc": "Хамгийн бага өртөгтэй", "price": 50000, "images": ["./assets/avtobus.jpg", "./assets/avtobus1.jpg", "./assets/purgon.jpg"] },
                                { "text": "Хувийн Тээвэр", "desc": "Тав тухтай", "price": 100000, "images": ["./assets/land.jpg", "./assets/land1.jpg", "./assets/land2.jpg"] }
                            ]
                        }
                    ]
                },
            ]
        };
    }

    //songoltiin datag duudaj avchirch bga heseg
    async loadOptionsData() {
        try {
            this.render(); // Render the component after the data is loaded
            this.attachEventListeners();
        } catch (error) {
            console.error('Error loading JSON data:', error);
        }
    }

    render() {
        //direction medeelliig 9n gazraas damjuulj ug attributa-a component deeree haruulj bga.
        const direction = this.getAttribute('direction');
        //irsen direction buyu huvsgul gesen datagaaraa json-oso zuvhun ug gazriin medelliig haruulahad ashiglahad
        const selectedDirection = this.jsonData.travelDirections.find(item => item.direction === direction); // Find the matching direction
        if (!selectedDirection) {
            console.error('Direction not found');
            return;
        }

        this.optionsData = selectedDirection;
        //songogdson gazriin medeelleer html-e fill hiij bga
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./css/styles.css">
              <style>
                .option-card { cursor: pointer; }
                .booking-selection { display: none; }
            </style>
            <section class="package-details">
                <div class="package-columns">
                    <div class="map">
                                  <iframe
                    src="${this.optionsData.map}"
                    width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    
                    <!-- Booking Sections -->
                    <div class="booking-container">
                        ${this.optionsData.bookingSections.map(section => this.createBookingSection(section.title, section.id, section.options)).join('')}
                        
                        <!-- People Count -->
                        <div class="booking-section">
                            <h2>👨‍👩‍👧‍👦 Хүмүүсийн Тоо</h2>
                            <div class="option-grid">
                                <div>
                                    <label>Насанд Хүрэгчид:</label>
                                    <input type="number" id="adult-count" value="0" min="0" class="input-number" />
                                </div>
                                <div>
                                    <label>Хүүхэд:</label>
                                    <input type="number" id="child-count" value="0" min="0" class="input-number" />
                                </div>
                            </div>
                        </div>
                        
                        <!-- Total Price -->
                        <div class="total-price" id="totalPrice">Нийт үнэ: 0₮</div>
                        <button id="bookBtn" class="booking-button">Захиалах</button>
                    </div>
                </div>
            </section>
        `;
    }
    //booking section hesgiig beldej uusgej bn
    createBookingSection(title, type, options) {
        return `
            <div class="booking-section">
                <h2>${title}</h2>
                <div class="option-grid">
                    ${options.map(option => `
                        <div class="option-card" data-type="${type}" data-price="${option.price}">
                            <h3>${option.text}</h3>
                            <p>${option.desc}</p>
                            <p>Үнэ: ${option.price.toLocaleString()}₮</p>
                            <div class="booking-selection" style="display: none;">
                                ${option.images ? option.images.map(image => `
                                    <img src="${image}" alt="Option image" class="booking-image">
                                `).join('') : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // hunii too oruulj bga hesgiin datag avah
    attachEventListeners() {
        // Attach event listeners for option cards dynamically
        this.shadowRoot.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', event => this.handleOptionCardClick(event));
        });

        // Attach event listeners for people count inputs
        this.shadowRoot.getElementById('adult-count').addEventListener('input', () => this.updatePeopleCount());
        this.shadowRoot.getElementById('child-count').addEventListener('input', () => this.updatePeopleCount());

        // Attach event listener for booking button
        this.shadowRoot.getElementById('bookBtn').addEventListener('click', () => this.processBooking());
    }
    //songoltuud hiisen datag avch irj bga heseg
    handleOptionCardClick(event) {
        const card = event.currentTarget;
        const type = card.getAttribute('data-type');
        const price = parseInt(card.getAttribute('data-price')) || 0;

        // Deselect other cards of the same type
        this.shadowRoot.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(otherCard => {
            otherCard.classList.remove('selected');
            const imgSection = otherCard.querySelector('.booking-selection');
            if (imgSection) imgSection.style.display = 'none'; // Hide images for deselected cards
        });

        // Select the clicked card
        card.classList.add('selected');
        const imgSection = card.querySelector('.booking-selection');
        if (imgSection) imgSection.style.display = 'block'; // Show images for the selected card

        // Update selected options
        this.selectedOptions[type] = price;

        // Recalculate the total price
        this.calculateTotalPrice();
    }
    //gurvan shirheg zurgiig haruulah haruulahguig shiidej bga
    addEventListeners() {
        // Select the option card and toggle visibility of .booking-selection
        const card = this.shadowRoot.querySelector('.option-card');
        const imgSection = this.shadowRoot.querySelector('.booking-selection');
        if (card && imgSection) {
            card.addEventListener('click', () => {
                const isVisible = imgSection.style.display === 'block';
                imgSection.style.display = isVisible ? 'none' : 'block';
            });
        }
    }
   //kartiin toog baazaas avchraad update hiij bga heseg - end yagaa dahiad duudaj bga ve geheer baaz ru hadgalj bga ustgaj bga uildliig hiij bga uchraas kart shinechleh heregtei
    async updateCartCount() {
        try {
            const response = await fetch('http://localhost:5005/api/trips', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            // Update the cart item count
            const cartItemCountElement = document.getElementById('cartItemCount');
            cartItemCountElement.textContent = data.length;

        } catch (error) {
            console.error('API call failed:', error.message);
        }
    }
    // hunii toonii uurchlugdsun medeellig tur zuur hadgalaad total price bodoj bga
    updatePeopleCount() {
        const adultCount = Math.max(parseInt(this.shadowRoot.getElementById('adult-count').value) || 0, 0);
        const childCount = Math.max(parseInt(this.shadowRoot.getElementById('child-count').value) || 0, 0);

        this.peopleCount.adults = adultCount;
        this.peopleCount.children = childCount / 2;

        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        const basePrice = Object.values(this.selectedOptions).reduce((sum, price) => sum + price, 0);
        const totalPeople = (this.peopleCount.adults || 0) + (this.peopleCount.children || 0);
        const totalPrice = basePrice * (totalPeople > 0 ? totalPeople : 1);

        this.shadowRoot.getElementById('totalPrice').textContent = `Нийт үнэ: ${totalPrice.toLocaleString()}₮`;
    }


    //zahialga hiih heseg
    processBooking() {
        const direction = this.getAttribute('direction'); 
        let bookingList = JSON.parse(localStorage.getItem('bookingList')) || [];
        if (!Object.values(this.selectedOptions).every(value => value > 0)) {
            alert('Бүх сонголтоо хийнэ үү!');
            return;
        }

        const sumPrice = Object.values(this.selectedOptions).reduce((sum, price) => sum + price, 0);
        const totalPrice = sumPrice * ((this.peopleCount.adults || 0) + (this.peopleCount.children || 0));

        const bookingDetails = {
            duration: this.shadowRoot.querySelector('.option-card[data-type="duration"].selected')?.textContent.trim() || "",
            hotel: this.shadowRoot.querySelector('.option-card[data-type="hotel"].selected')?.textContent.trim() || "",
            meal: this.shadowRoot.querySelector('.option-card[data-type="meal"].selected')?.textContent.trim() || "",
            transport: this.shadowRoot.querySelector('.option-card[data-type="transport"].selected')?.textContent.trim() || "",
            adults: this.peopleCount.adults,
            children: this.peopleCount.children === 0.5 ? 1 : this.peopleCount.children,
            totalPrice,
            sumPrice,
            destination: direction || "huhnuur"
        };

        bookingList.push(bookingDetails);
        //local storage ru hadgalj bga 
        localStorage.setItem('bookingList', JSON.stringify(bookingList));
        alert('Захиалга амжилттай!');
        // baazru api duudaj zahialgiin medeelliig hadgalj bga
        fetch('http://localhost:5005/api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingDetails)  // Convert the bookingDetails object to JSON format
        })
            .then(response => response.json())
            .then(data => {
                console.log('Trip added:', data);
                alert('Your booking has been successfully added!');
                this.updateCartCount();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving the booking.');
            });
        // Save the updated bookingList to localStorage
        localStorage.setItem('bookingList', JSON.stringify(bookingList));
        this.updateCartCount();
        // window.location.href = '/order-summary';
    }

}

customElements.define('booking-section', BookingSection);
