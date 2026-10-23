import json

def build_history_and_more():
    # 1. HISTORICAL SITES & FREEDOM MOVEMENT
    history = [
        {
            "id": "lothal",
            "name": "Lothal (Harappan Port City)",
            "period": "Ancient",
            "yearPeriod": "c. 2400 BCE – 1900 BCE",
            "state": "Gujarat",
            "coordinates": [72.25, 22.52],
            "associatedPersonalities": ["S. R. Rao (excavator, 1954-58)"],
            "causesConsequences": "Thriving international seaport of the Indus Valley Civilization connected to the Gulf of Khambhat via the ancient Bhogavo and Sabarmati river courses.",
            "examFacts": [
                "World's earliest known tidal dockyard, engineered with sluice gates to lock water levels during low tide.",
                "Discovered by archaeologist S. R. Rao in 1954.",
                "Evidence of double burial (male and female buried together in a single grave).",
                "Discovery of Persian Gulf button seal confirming direct overseas maritime commerce with Mesopotamia (Dilmun and Meluhha).",
                "National Maritime Heritage Complex (NMHC) is currently being developed here under the Sagarmala programme."
            ]
        },
        {
            "id": "dholavira",
            "name": "Dholavira: Harappan Metropolis",
            "period": "Ancient",
            "yearPeriod": "c. 3000 BCE – 1500 BCE",
            "state": "Gujarat",
            "coordinates": [70.22, 23.88],
            "associatedPersonalities": ["J. P. Joshi (discovered 1968)", "R. S. Bisht (excavated 1990)"],
            "causesConsequences": "Sophisticated fortified Harappan island metropolis on Khadir Bet in the Great Rann of Kutch.",
            "examFacts": [
                "Inscribed as India's 40th UNESCO World Heritage Site in July 2021 (first Harappan site in India to receive this status).",
                "Features unique tripartite city planning: Citadel (Castle and Bailey), Middle Town, and Lower Town (unlike standard bipartite Harappan cities).",
                "World-renowned for its monumental water management system, comprising 16 interconnected cascading rock-cut reservoirs impounding water from the seasonal Manhar and Mansar streams.",
                "Discovery of the famous ten-character 'Dholavira Signboard' written in Indus script using white gypsum crystalline tiles.",
                "Extensive use of dressed stone masonry in fortification walls, contrasting with the baked mud-brick architecture of Mohenjo-daro and Harappa."
            ]
        },
        {
            "id": "sarnath",
            "name": "Sarnath (Isipatana / Deer Park)",
            "period": "Ancient",
            "yearPeriod": "c. 528 BCE onwards (Mauryan c. 250 BCE)",
            "state": "Uttar Pradesh",
            "coordinates": [83.02, 25.38],
            "associatedPersonalities": ["Gautama Buddha", "Emperor Ashoka"],
            "causesConsequences": "Site of Buddha's First Sermon (Dharmachakra Pravartana) following his enlightenment at Bodh Gaya.",
            "examFacts": [
                "Site of Gautama Buddha's first sermon (Dharmachakra Pravartana Sutta - 'Turning the Wheel of the Law') delivered to the five ascetics (Pancha Vaggiya).",
                "Lion Capital of Ashoka excavated here (featuring four Asiatic lions standing back to back above an abacus with wheel, bull, horse, lion, and elephant) was adopted as the National Emblem of India on 26 January 1950.",
                "The 24-spoke Ashoka Chakra from its base adorns the center of India's National Flag.",
                "Features the monumental Dhamek Stupa (rising 43.6 meters) and Chaukhandi Stupa.",
                "Chinese pilgrim Xuanzang visited Sarnath in 640 CE, recording over 1,500 monks living in the Mahavihara."
            ]
        },
        {
            "id": "nalanda",
            "name": "Nalanda Mahavihara",
            "period": "Ancient",
            "yearPeriod": "5th century CE – 1200 CE",
            "state": "Bihar",
            "coordinates": [85.44, 25.13],
            "associatedPersonalities": ["Kumaragupta I (founder)", "Harshavardhana", "Xuanzang (Hiuen Tsang)", "Yijing", "Dharmapala", "Bakhtiyar Khilji"],
            "causesConsequences": "World's foremost ancient residential monastic university, educating over 10,000 international students until destroyed by Bakhtiyar Khilji in c. 1193 CE.",
            "examFacts": [
                "Founded under Gupta Emperor Kumaragupta I in the early 5th century CE and patronized by Emperor Harshavardhana and Pala kings.",
                "Chinese Buddhist monk Xuanzang studied here for several years under Abbot Shilabhadra in the 7th century CE.",
                "Celebrated for its monumental multi-storeyed library complex known as Dharmaganja, comprising three soaring buildings: Ratnasagara, Ratnodadhi, and Ratnaranjaka.",
                "Inscribed as a UNESCO World Heritage Site in 2016.",
                "Revived in modern times as an international university under the Nalanda University Act, 2010."
            ]
        },
        {
            "id": "champaran",
            "name": "Champaran (Satyagraha 1917)",
            "period": "Modern (Freedom Movement)",
            "yearPeriod": "April 1917",
            "state": "Bihar",
            "coordinates": [84.99, 26.80],
            "associatedPersonalities": ["Mahatma Gandhi", "Raj Kumar Shukla", "Dr. Rajendra Prasad", "J. B. Kripalani", "Anugrah Narayan Sinha"],
            "causesConsequences": "Mahatma Gandhi's first civil disobedience movement in India, successfully abolishing the exploitative European planter Tinkathia system.",
            "examFacts": [
                "Mahatma Gandhi's first Satyagraha / Civil Disobedience experiment on Indian soil after returning from South Africa in 1915.",
                "Invited to Champaran by local indigo farmer Raj Kumar Shukla during the Lucknow Congress session of December 1916.",
                "Opposed the Tinkathia system, where European planters forcibly bound ryots to cultivate indigo on 3/20th of their best agricultural land.",
                "The Government appointed the Champaran Agrarian Enquiry Committee with Gandhi as a member, leading to the Champaran Agrarian Act of 1918 abolishing Tinkathia.",
                "Rabindranath Tagore is believed to have bestowed the title 'Mahatma' upon Gandhi during the Champaran struggle."
            ]
        },
        {
            "id": "dandi",
            "name": "Dandi (Salt Satyagraha 1930)",
            "period": "Modern (Freedom Movement)",
            "yearPeriod": "12 March – 6 April 1930",
            "state": "Gujarat",
            "coordinates": [72.79, 20.89],
            "associatedPersonalities": ["Mahatma Gandhi", "Sarojini Naidu", "78 chosen Satyagrahis"],
            "causesConsequences": "Inauguration of the nationwide Civil Disobedience Movement against the British colonial salt tax monopoly.",
            "examFacts": [
                "The historic Dandi Salt March commenced from Sabarmati Ashram, Ahmedabad on 12 March 1930 and reached the coastal village of Dandi in Navsari district on 5 April 1930 (covering 240 miles / 385 km in 24 days).",
                "On 6 April 1930, Gandhi picked up a handful of natural salt from the mudflats, symbolically breaking the British Salt Monopoly and inaugurating the nationwide Civil Disobedience Movement.",
                "Followed by the historic Dharasana Salt Raid led by Sarojini Naidu, Imam Saheb, and Manilal Gandhi, immortalized in reporting by American journalist Webb Miller.",
                "Led directly to the Gandhi-Irwin Pact of 5 March 1931 and Gandhi's attendance at the Second Round Table Conference in London.",
                "National Salt Satyagraha Memorial is located at Dandi, inaugurated in 2019."
            ]
        },
        {
            "id": "jallianwala_bagh",
            "name": "Jallianwala Bagh (1919 Massacre)",
            "period": "Modern (Freedom Movement)",
            "yearPeriod": "13 April 1919 (Baisakhi)",
            "state": "Punjab",
            "coordinates": [74.88, 31.62],
            "associatedPersonalities": ["Colonel Reginald Dyer", "Michael O'Dwyer", "Dr. Saifuddin Kitchlew", "Dr. Satyapal", "Udham Singh"],
            "causesConsequences": "Brutal firing on peaceful civilians protesting the Rowlatt Act; decisive turning point alienating Indian public opinion from British rule.",
            "examFacts": [
                "On 13 April 1919 (Baisakhi Day), thousands gathered at Jallianwala Bagh in Amritsar to celebrate the harvest and peacefully protest the arrest of leaders Dr. Saifuddin Kitchlew and Dr. Satyapal under the draconian Rowlatt Act (Anarchical and Revolutionary Crimes Act of 1919).",
                "Brigadier-General Reginald Dyer blocked the sole narrow exit with troops and ordered firing without warning for 10 minutes until ammunition was exhausted, killing hundreds.",
                "Rabindranath Tagore renounced his British Knighthood in protest, writing a fiery letter to Viceroy Lord Chelmsford.",
                "Mahatma Gandhi returned his Kaiser-i-Hind gold medal and launched the nationwide Non-Cooperation Movement in 1920.",
                "The Hunter Commission (Disorders Inquiry Committee) was appointed to investigate the tragedy; Shaheed Udham Singh assassinated former Punjab Lieutenant Governor Michael O'Dwyer in London in 1940 to avenge the massacre."
            ]
        },
        {
            "id": "chauri_chaura",
            "name": "Chauri Chaura (1922 Incident)",
            "period": "Modern (Freedom Movement)",
            "yearPeriod": "4 February 1922",
            "state": "Uttar Pradesh",
            "coordinates": [83.59, 26.65],
            "associatedPersonalities": ["Mahatma Gandhi", "Bhagwan Ahir"],
            "causesConsequences": "Violent clash between protesters and police resulting in the burning of a police station; prompted Gandhi to unilaterally withdraw the Non-Cooperation Movement.",
            "examFacts": [
                "On 4 February 1922, a procession of Non-Cooperation volunteers clashed with police at Chauri Chaura market in Gorakhpur district, Uttar Pradesh.",
                "Protesters set fire to the police station, killing 22 policemen inside.",
                "Stunned by the departure from non-violence (Ahimsa), Mahatma Gandhi declared that India was not yet ready for mass civil disobedience and unilaterally halted the Non-Cooperation Movement on 12 February 1922 via the Bardoli Resolution.",
                "The withdrawal caused widespread shock and debate among national leaders including Motilal Nehru, C.R. Das, Subhas Chandra Bose, and Jawaharlal Nehru.",
                "Prompted Motilal Nehru and C.R. Das to form the Swaraj Party in January 1923 to contest legislative councils."
            ]
        }
    ]

    # 2. CULTURE AND HERITAGE
    culture = [
        {
            "id": "bharatanatyam",
            "name": "Bharatanatyam",
            "category": "Classical Dance",
            "associatedRegion": "Tamil Nadu (Thanjavur)",
            "state": "Tamil Nadu",
            "coordinates": [79.13, 10.78],
            "significance": "Oldest classical dance tradition of India, originally performed in temple sanctums by Devadasis as Sadir / Dasi Attam.",
            "examFacts": [
                "One of the eight classical dances of India recognized by the Sangeet Natak Akademi.",
                "Traced to Bharata Muni's Natya Shastra and Nandikeshvara's Abhinaya Darpana.",
                "Revived and codified in the early 20th century by E. Krishna Iyer and Rukmini Devi Arundale (who founded Kalakshetra in 1936).",
                "Repertoire structured by the Thanjavur Quartet (Chinnayya, Ponnaiya, Sivanandam, Vadivelu): Alarippu, Jatiswaram, Shabdam, Varnam, Padam, Javali, and Tillana.",
                "Emphasizes Ekaharya (one dancer playing multiple characters) and fire/Agni element (cosmic dance of Nataraja)."
            ]
        },
        {
            "id": "kathakali",
            "name": "Kathakali",
            "category": "Classical Dance",
            "associatedRegion": "Kerala",
            "state": "Kerala",
            "coordinates": [76.27, 9.98],
            "significance": "Grand classical dance-drama known for elaborate facial makeup (Vesham), towering headdresses (Kireetam), and profound eye expressions (Navarasas).",
            "examFacts": [
                "Evolved from earlier performing arts: Ramanattam (created by Kottarakkara Thampuran), Krishnanattam, and Koodiyattam.",
                "Characters categorized by elaborate makeup types: Paccha (Green - noble heroes/gods), Kathi (Knife - villains with arrogance like Ravana), Thadi (Beard - red, black, white), Kari (Black - demonesses), and Minukku (Radiant - women and sages).",
                "Revived by renowned Malayalam poet Vallathol Narayana Menon who established Kerala Kalamandalam in 1930.",
                "Accompanied by Sopana Sangeetham vocal singing and Chenda, Maddalam, Chengila, and Ilathalam percussion.",
                "Dancers undergo years of rigorous eye-muscle training using ghee and medicinal massage (Chavitti Uzhichil)."
            ]
        },
        {
            "id": "garba",
            "name": "Garba of Gujarat",
            "category": "Folk Dance",
            "associatedRegion": "Gujarat",
            "state": "Gujarat",
            "coordinates": [72.57, 23.02],
            "significance": "Devotional circle folk dance performed during the nine nights of Navratri, celebrating the divine feminine Shakti / Goddess Amba.",
            "examFacts": [
                "Inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in December 2023 (India's 15th intangible heritage element).",
                "The word 'Garba' derives from Sanskrit 'Garbha' (womb); dancers move in concentric circles around a perforated earthen lamp (Garbha Deep) symbolizing embryonic life and the cyclical cosmos.",
                "Performed exclusively in circles, symbolizing the Hindu cyclical view of time from creation to destruction.",
                "Celebrated across Gujarat and the global diaspora during the nine nights of Sharad Navratri, making it one of the largest participatory public dance festivals in the world."
            ]
        },
        {
            "id": "chhau",
            "name": "Chhau Dance",
            "category": "Folk Dance",
            "associatedRegion": "Jharkhand, West Bengal, Odisha",
            "state": "Jharkhand",
            "coordinates": [85.98, 22.78],
            "significance": "Vigorous semi-classical martial dance enacting episodes from the Ramayana, Mahabharata, and indigenous folklore.",
            "examFacts": [
                "Inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2010.",
                "Possesses three distinct geographical styles: Seraikella Chhau (Jharkhand - uses stylized masks), Purulia Chhau (West Bengal - uses colossal acrobatic clay/paper-mache masks), and Mayurbhanj Chhau (Odisha - performed without masks).",
                "Rooted in ancient indigenous martial arts movements (Chhari and Parikhanda).",
                "Traditionally performed during the spring festival of Chaitra Parva in honor of Shiva, Shakti, and Sun God.",
                "Characterized by high leaps, athletic leg extensions, and dynamic drum rhythms played on Dhol, Nagara, and Shehnai."
            ]
        }
    ]

    # 3. POLITY TOPICS
    polity = [
        {
            "id": "constitution_making",
            "title": "Making of the Indian Constitution",
            "articles": ["Article 395", "Preamble"],
            "schedules": ["All 12 Schedules"],
            "summary": "The Constituent Assembly was constituted in November 1946 under the Cabinet Mission Plan. Dr. Sachchidananda Sinha served as temporary President; Dr. Rajendra Prasad was elected permanent President. Dr. B.R. Ambedkar chaired the 7-member Drafting Committee.",
            "examFacts": [
                "Took 2 years, 11 months, and 18 days to complete across 11 sessions.",
                "Adopted on 26 November 1949 (celebrated as National Constitution Day / Samvidhan Divas) and came into full legal effect on 26 January 1950 (commemorating the Purna Swaraj declaration of 26 Jan 1930).",
                "Originally contained a Preamble, 395 Articles in 22 Parts, and 8 Schedules (expanded today to over 448 Articles in 25 Parts and 12 Schedules).",
                "Handwritten and calligraphed in English by Prem Behari Narain Raizada and illustrated with indigenous miniature paintings by Nandalal Bose and Beohar Rammanohar Sinha of Santiniketan.",
                "The Elephant was adopted as the official emblem/seal of the Constituent Assembly."
            ]
        },
        {
            "id": "fundamental_rights",
            "title": "Fundamental Rights (Part III, Articles 12–35)",
            "articles": ["Articles 12 to 35"],
            "schedules": [],
            "summary": "Described as the 'Magna Carta of India'. Enforceable by courts through constitutional prerogative writs issued under Article 32 (Supreme Court) and Article 226 (High Courts).",
            "examFacts": [
                "Six Fundamental Rights guaranteed: Right to Equality (Art 14–18), Right to Freedom (Art 19–22), Right against Exploitation (Art 23–24), Right to Freedom of Religion (Art 25–28), Cultural and Educational Rights (Art 29–30), and Right to Constitutional Remedies (Art 32).",
                "Right to Property (originally Art 31) was deleted from Part III by the 44th Constitutional Amendment Act, 1978 and made a legal right under Article 300A in Part XII.",
                "Dr. B.R. Ambedkar declared Article 32 (Right to Constitutional Remedies) as the 'very Soul of the Constitution and the very Heart of it'.",
                "Five Constitutional Writs: Habeas Corpus ('To have the body of'), Mandamus ('We command'), Prohibition ('To forbid'), Certiorari ('To be certified'), and Quo-Warranto ('By what authority').",
                "Articles 20 (protection against ex-post facto laws, double jeopardy, self-incrimination) and 21 (right to life and personal liberty) cannot be suspended even during a National Emergency declared under Article 352 (amended by 44th CAA, 1978)."
            ]
        },
        {
            "id": "dpsp",
            "title": "Directive Principles of State Policy (Part IV, Articles 36–51)",
            "articles": ["Articles 36 to 51"],
            "schedules": [],
            "summary": "Non-justiciable ideals borrowed from the Irish Constitution of 1937 aiming to establish a socio-economic Welfare State rather than merely a police state.",
            "examFacts": [
                "Dr. Ambedkar described DPSP as 'Novel Features' of the Constitution; Granville Austin described Fundamental Rights and DPSP together as the 'Conscience of the Constitution'.",
                "Classified broadly into three ideological categories: Socialistic (Art 38, 39, 39A, 41, 42, 43), Gandhian (Art 40, 43, 43B, 46, 47, 48), and Liberal-Intellectual (Art 44, 45, 48, 48A, 49, 50, 51).",
                "Article 40 directs the state to organize Village Panchayats as units of self-government (given constitutional status by 73rd CAA 1992).",
                "Article 44 calls for a Uniform Civil Code (UCC) for all citizens throughout India.",
                "Article 50 directs the separation of the Judiciary from the Executive in the public services of the State."
            ]
        },
        {
            "id": "panchayati_raj",
            "title": "Panchayati Raj & Local Self-Government (73rd & 74th Amendments)",
            "articles": ["Articles 243 to 243ZG"],
            "schedules": ["11th Schedule (29 subjects)", "12th Schedule (18 subjects)"],
            "summary": "Constitutionalization of the three-tier Panchayati Raj system (Gram, Block, District) and Municipal bodies, establishing democratic decentralization.",
            "examFacts": [
                "Balwant Rai Mehta Committee (1957) originally recommended a three-tier Panchayati Raj system; Rajasthan was the first state to inaugurate Panchayati Raj at Nagaur on 2 October 1959.",
                "73rd Constitutional Amendment Act, 1992 inserted Part IX ('The Panchayats') and the Eleventh Schedule containing 29 functional subjects (came into effect on 24 April 1993, celebrated as National Panchayati Raj Day).",
                "74th Constitutional Amendment Act, 1992 inserted Part IXA ('The Municipalities') and the Twelfth Schedule containing 18 functional subjects.",
                "Article 243D mandates minimum 1/3rd (33.3%) reservation of seats and chairpersons for women across all tiers (many states have raised this to 50%).",
                "Article 243K establishes an independent State Election Commission to conduct local body polls, and Article 243I establishes a State Finance Commission every 5 years to review financial devolution."
            ]
        }
    ]

    # 4. EXAM QUIZ QUESTIONS
    quizzes = [
        {
            "id": "q1",
            "question": "Which is the highest mountain peak located entirely within the undisputed sovereign territory of India?",
            "category": "Geography",
            "type": "mcq",
            "options": ["Kangchenjunga", "Nanda Devi", "Kamet", "K2 (Godwin-Austen)"],
            "correctAnswer": 1,
            "explanation": "Nanda Devi (7,816 m) in Chamoli district of Uttarakhand is the highest peak located entirely within India. Kangchenjunga (8,586 m) lies on the Indo-Nepal international boundary, while K2 (8,611 m) is located in Pakistan-occupied Kashmir (Gilgit-Baltistan).",
            "examFacts": ["Nanda Devi National Park was inscribed as a UNESCO World Heritage Site in 1988."],
            "coordinates": [79.97, 30.37]
        },
        {
            "id": "q2",
            "question": "Which Indian state has the longest coastline among all mainland states?",
            "category": "Geography",
            "type": "mcq",
            "options": ["Tamil Nadu", "Maharashtra", "Andhra Pradesh", "Gujarat"],
            "correctAnswer": 3,
            "explanation": "Gujarat possesses the longest coastline among all Indian states, spanning approximately 1,600 km (~24% of the mainland Indian coastline), followed by Andhra Pradesh (~974 km) and Tamil Nadu (~906 km).",
            "examFacts": ["India's total coastline including island territories is 7,516.6 km."],
            "coordinates": [71.5, 22.0]
        },
        {
            "id": "q3",
            "question": "On which river is the world's longest earthen dam, Hirakud Dam, constructed?",
            "category": "Rivers & Water",
            "type": "mcq",
            "options": ["Godavari", "Mahanadi", "Narmada", "Krishna"],
            "correctAnswer": 1,
            "explanation": "Hirakud Dam was constructed across the Mahanadi River near Sambalpur in Odisha. Inaugurated in 1957 by Jawaharlal Nehru, its main section is 4.8 km and total dyke system extends 25.8 km.",
            "examFacts": ["Hirakud Reservoir was designated as a Ramsar Wetland site in 2021."],
            "coordinates": [83.87, 21.52]
        },
        {
            "id": "q4",
            "question": "Keibul Lamjao National Park, the world's only floating national park, is situated on which water body?",
            "category": "Environment",
            "type": "mcq",
            "options": ["Chilika Lake", "Loktak Lake", "Wular Lake", "Vembanad Lake"],
            "correctAnswer": 1,
            "explanation": "Keibul Lamjao National Park is located on Loktak Lake in Bishnupur district of Manipur. It is famous for floating biomass islands called 'Phumdis' and is the exclusive refuge of the endangered dancing deer, Sangai.",
            "examFacts": ["Loktak Lake is listed on the Ramsar Montreux Record due to ecological concerns from Ithai Barrage."],
            "coordinates": [93.85, 24.50]
        },
        {
            "id": "q5",
            "question": "The historic Dandi March launched by Mahatma Gandhi in March 1930 originated from which location?",
            "category": "History",
            "type": "mcq",
            "options": ["Sevagram Ashram, Wardha", "Sabarmati Ashram, Ahmedabad", "Kochrab Ashram", "Bardoli"],
            "correctAnswer": 1,
            "explanation": "The Salt Satyagraha march began on 12 March 1930 from Sabarmati Ashram in Ahmedabad and covered 240 miles to the coastal village of Dandi in Navsari district, Gujarat.",
            "examFacts": ["Accompanied by 78 chosen Satyagrahis from various provinces of India."],
            "coordinates": [72.58, 23.06]
        },
        {
            "id": "q6",
            "question": "Which was the first state in Independent India formed on a linguistic basis?",
            "category": "Polity",
            "type": "mcq",
            "options": ["Kerala", "Andhra State", "Karnataka (Mysore)", "Maharashtra"],
            "correctAnswer": 1,
            "explanation": "Andhra State was created on 1 October 1953 by carving out Telugu-speaking northern districts from Madras State following the 56-day hunger strike and martyrdom of Potti Sreeramulu. This spurred the appointment of the States Reorganisation Commission (Fazal Ali Commission) in December 1953.",
            "examFacts": ["The States Reorganisation Act was enacted by Parliament in November 1956."],
            "coordinates": [80.5, 16.5]
        },
        {
            "id": "q7",
            "question": "Which pass is certified by Guinness World Records as the highest motorable road in the world?",
            "category": "Geography",
            "type": "mcq",
            "options": ["Khardung La", "Zoji La", "Umling La", "Rohtang Pass"],
            "correctAnswer": 2,
            "explanation": "Umling La Pass in eastern Ladakh, constructed by the Border Roads Organisation (BRO) under Project Himank at an altitude of 19,024 feet (5,798 m), is officially recognized as the highest motorable road in the world.",
            "examFacts": ["Constructed to connect Chisumle and Demchok near the Line of Actual Control."],
            "coordinates": [79.28, 32.69]
        },
        {
            "id": "q8",
            "question": "Which tiger reserve in India holds the distinction of having the largest geographical area?",
            "category": "Environment",
            "type": "mcq",
            "options": ["Jim Corbett Tiger Reserve", "Bandipur Tiger Reserve", "Nagarjunsagar-Srisailam Tiger Reserve", "Similipal Tiger Reserve"],
            "correctAnswer": 2,
            "explanation": "Nagarjunsagar-Srisailam Tiger Reserve in Andhra Pradesh covers an area of 3,728 sq km, making it the largest tiger reserve by total area in India.",
            "examFacts": ["Bor Tiger Reserve in Maharashtra has the smallest core area among tiger reserves in India."],
            "coordinates": [78.85, 16.0]
        }
    ]

    # 5. FLASHCARDS
    flashcards = [
        {
            "id": "fc1",
            "topic": "Physical Geography",
            "front": "What are the three longitudinal parallel ranges of the Himalayas?",
            "back": "1. Greater Himalayas (Himadri) - average elevation 6,000 m\n2. Lesser Himalayas (Himachal) - 3,700 to 4,500 m\n3. Outer Himalayas (Shivaliks) - 900 to 1,100 m",
            "examTag": "All Exams",
            "hint": "Himadri, Himachal, Shivalik"
        },
        {
            "id": "fc2",
            "topic": "River Systems",
            "front": "Which are the only two major west-flowing Peninsular rivers that flow through rift valleys?",
            "back": "Narmada and Tapi (Tapti). Both flow through fault-formed grabens/rift valleys between the Vindhya and Satpura ranges and do not form deltas, but estuaries at their mouths.",
            "examTag": "UPSC",
            "hint": "Between Vindhya and Satpura"
        },
        {
            "id": "fc3",
            "topic": "Environment & Ramsar",
            "front": "Which was the first wetland of India designated under the Ramsar Convention?",
            "back": "Chilika Lake in Odisha (designated on 1 October 1981, alongside Keoladeo National Park in Rajasthan). Chilika was also successfully removed from the Montreux Record in 2002.",
            "examTag": "State PSC",
            "hint": "A brackish lagoon in eastern India"
        },
        {
            "id": "fc4",
            "topic": "Indian History",
            "front": "What was the Tinkathia system opposed by Mahatma Gandhi in Champaran (1917)?",
            "back": "A colonial agrarian system in Bihar under which European indigo planters legally compelled tenant farmers (ryots) to cultivate indigo on 3/20th of their total landholdings.",
            "examTag": "All Exams",
            "hint": "3 out of 20 parts"
        },
        {
            "id": "fc5",
            "topic": "Indian Polity",
            "front": "What did Dr. B.R. Ambedkar describe as the 'Heart and Soul' of the Indian Constitution?",
            "back": "Article 32: Right to Constitutional Remedies, which empowers citizens to move the Supreme Court directly for the enforcement of Fundamental Rights through five prerogative writs.",
            "examTag": "UPSC",
            "hint": "Article 32"
        },
        {
            "id": "fc6",
            "topic": "Economy & Minerals",
            "front": "Which state and district is the sole active commercial producer of diamonds in India?",
            "back": "Madhya Pradesh (Panna district). The Majhgawan mine is operated by the National Mineral Development Corporation (NMDC).",
            "examTag": "SSC",
            "hint": "Panna National Park vicinity"
        }
    ]

    # Save all datasets
    with open('src/data/atlas/history.json', 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2)

    with open('src/data/atlas/culture.json', 'w', encoding='utf-8') as f:
        json.dump(culture, f, indent=2)

    with open('src/data/atlas/polity.json', 'w', encoding='utf-8') as f:
        json.dump(polity, f, indent=2)

    with open('src/data/atlas/quizzes.json', 'w', encoding='utf-8') as f:
        json.dump(quizzes, f, indent=2)

    with open('src/data/atlas/flashcards.json', 'w', encoding='utf-8') as f:
        json.dump(flashcards, f, indent=2)

    print('Successfully generated history, culture, polity, quizzes, and flashcards datasets!')

build_history_and_more()
