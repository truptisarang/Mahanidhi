const indian_states_and_districts = [
    {
        "state": "Andhra Pradesh",
        "districts": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "West Godavari", "Vizianagaram"]
    },
    {
        "state": "Arunachal Pradesh",
        "districts": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Lower Siang", "Changlang", "Tirap", "Longding"]
    },
    {
        "state": "Assam",
        "districts": ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Charaideo", "Darrang", "Dhemaji", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"]
    },
    {
        "state": "Bihar",
        "districts": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"]
    },
    {
        "state": "Chhattisgarh",
        "districts": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Korba", "Kondagaon", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"]
    },
    {
        "state": "Goa",
        "districts": ["North Goa", "South Goa"]
    },
    {
        "state": "Gujarat",
        "districts": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"]
    },
    {
        "state": "Haryana",
        "districts": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Narnaul", "Palwal", "Panchkula", "Pehowa", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"]
    },
    {
        "state": "Himachal Pradesh",
        "districts": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kinnaur", "Mandi", "Solan", "Sirmaur", "Una", "Lahaul and Spiti"]
    },
    {
        "state": "Jharkhand",
        "districts": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"]
    },
    {
        "state": "Karnataka",
        "districts": ["Bagalkot", "Bangalore", "Bangalore Rural", "Belagavi", "Bellary", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"]
    },
    {
        "state": "Kerala",
        "districts": ["Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"]
    },
    {
        "state": "Madhya Pradesh",
        "districts": ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panchmahals", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Tikamgarh", "Ujjain", "Vidisha"]
    },
    {
        "state": "Maharashtra",
        "districts": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Mumbai Suburban", "Nandurbar", "Nanded", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"]
    },
    {
        "state": "Manipur",
        "districts": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"]
    },
    {
        "state": "Meghalaya",
        "districts": ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "South Khasi Hills", "West Garo Hills", "West Khasi Hills"]
    },
    {
        "state": "Mizoram",
        "districts": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"]
    },
    {
        "state": "Nagaland",
        "districts": ["Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"]
    },
    {
        "state": "Odisha",
        "districts": ["Angul", "Bargarh", "Baudh", "Balangir", "Balasore", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"]
    },
    {
        "state": "Punjab",
        "districts": ["Amritsar", "Barnala", "Bathinda", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Patiala", "Rupnagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"]
    },
    {
        "state": "Rajasthan",
        "districts": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"]
    },
    {
        "state": "Sikkim",
        "districts": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"]
    },
    {
        "state": "Tamil Nadu",
        "districts": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "The Nilgiris", "Theni", "Tiruchirappalli", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"]
    },
    {
        "state": "Telangana",
        "districts": ["Adilabad", "Hyderabad", "Jagitial", "Jangaon", "Jayashankar-Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Warangal", "Yadadri-Bhongir"]
    },
    {
        "state": "Tripura",
        "districts": ["Dhalai", "Gomati", "Khowai", "North Tripura", "South Tripura", "Unakoti", "West Tripura"]
    },
    {
        "state": "Uttar Pradesh",
        "districts": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Baghpat", "Ballia", "Balrampur", "Banda", "Barabanki", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hapur", "Hamirpur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Raebareli", "Rampur", "Saharanpur", "Shahjahanpur", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"]
    },
    {
        "state": "Uttarakhand",
        "districts": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"]
    },
    {
        "state": "West Bengal",
        "districts": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"]
    },
    {
        "state": "Andaman and Nicobar Islands",
        "districts": ["Andaman", "Nicobar"]
    },
    {
        "state": "Chandigarh",
        "districts": ["Chandigarh"]
    },
    {
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "districts": ["Dadra", "Daman", "Diu"]
    },
    {
        "state": "Lakshadweep",
        "districts": ["Amini", "Andrott", "Bithra", "Chetlat", "Kavaratti", "Kochi", "Kalapeni"]
    },
    {
        "state": "Delhi",
        "districts": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"]
    },
    {
        "state": "Puducherry",
        "districts": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
    }
]

export default indian_states_and_districts;