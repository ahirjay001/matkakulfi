"""
Desi Mastaani - seed data for flavours and Gujarat locations.
EDITABLE PLACEHOLDER DATA: Replace/extend the GUJARAT_LOCATIONS list with the
real outlet list when the client provides it. Flavour lineup is also editable.
"""

FLAVOURS = [
    {
        "id": "kesar-pista",
        "name": "Kesar Pista",
        "tagline": "Shahi kesar, crunchy pista — ekdum royal mazaa",
        "description": "Asli Kashmiri kesar aur roasted pista, dhime aanch pe pakaye gaye doodh mein. Ye wali kulfi nahi, emotion hai.",
        "badge": "Bestseller",
        "color": "#E46A12",
        "image": "https://images.unsplash.com/photo-1517244683847-7456b63c5969?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "malai-matka",
        "name": "Malai Matka",
        "tagline": "Doodh ki asli malai, matke wali thandak",
        "description": "Ghante bhar ubla hua doodh, upar se gaadi malai — simple, pure, aur bilkul bachpan wala taste.",
        "badge": "Classic",
        "color": "#B6452C",
        "image": "https://images.unsplash.com/photo-1620197544618-af5f5366abb3?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "rajwadi-meva",
        "name": "Rajwadi Meva",
        "tagline": "Kaju, badam, anjeer — raja-maharaja feel",
        "description": "Dry fruits ka pura khazana ek matke mein. Har bite mein kuch naya milta hai — kabhi kaju, kabhi anjeer.",
        "badge": "Premium",
        "color": "#3A0B1E",
        "image": "https://images.unsplash.com/photo-1625996605618-da0c21d42e62?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "kesar-aam",
        "name": "Kesar Aam",
        "tagline": "Gir ka kesar aam, garmi ka asli jawab",
        "description": "Gujarat ke famous kesar aam ka pulp, seedha matke mein. Summer special jo saal bhar yaad rehta hai.",
        "badge": "Seasonal Star",
        "color": "#FFC533",
        "image": "https://images.unsplash.com/photo-1546173159-315724a31696?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "paan-mastaani",
        "name": "Paan Mastaani",
        "tagline": "Meetha paan, thanda twist — shaadi wala flavour",
        "description": "Calcutta meetha paan aur gulkand ka mashup, kulfi ke roop mein. Khaane ke baad ka digestion bhi, dessert bhi.",
        "badge": "Fan Favourite",
        "color": "#1F7A3A",
        "image": "https://images.unsplash.com/photo-1635778975932-6f51c8fa2ece?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "gulab-e-khaas",
        "name": "Gulab-e-Khaas",
        "tagline": "Gulkand aur rose petals — pyaar wali kulfi",
        "description": "Desi gulab ki pankhudiyan aur homemade gulkand. Thodi si nawabi, poori si mohabbat.",
        "badge": "Festive",
        "color": "#D11B6B",
        "image": "https://images.unsplash.com/photo-1602777256214-19c44dffecb4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "chocolate-dhamaal",
        "name": "Chocolate Dhamaal",
        "tagline": "Bachcho ka favourite, bado ka guilty pleasure",
        "description": "Rich cocoa aur desi doodh ka jugalbandi. Chocolate bhi, kulfi bhi — dono duniya ka best.",
        "badge": "Kids Love It",
        "color": "#3B2416",
        "image": "https://images.unsplash.com/photo-1599849338138-91c566d530cd?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "sitafal-special",
        "name": "Sitafal Special",
        "tagline": "Custard apple ka creamy kamaal",
        "description": "Fresh sitafal ka pulp, bina kisi artificial flavour ke. Jo log jaante hain, wo isi ke liye aate hain.",
        "badge": "Connoisseur Pick",
        "color": "#1E4ED8",
        "image": "https://images.unsplash.com/photo-1604256913753-eef2d1d8ca21?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "rabdi-rasili",
        "name": "Rabdi Rasili",
        "tagline": "Gaadi rabdi, matke ki khushboo",
        "description": "Slow-cooked rabdi jo chammach se nahi, dil se khaayi jaati hai. Old-school lovers ke liye.",
        "badge": "Heritage",
        "color": "#B6452C",
        "image": "https://images.unsplash.com/photo-1612168829710-1405fc7e0a48?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    },
    {
        "id": "kaju-draksh",
        "name": "Kaju Draksh",
        "tagline": "Kaju ki richness, draksh ki mithaas",
        "description": "Whole kaju aur juicy kishmish, har scoop mein. Gujarat ka evergreen combination.",
        "badge": "Evergreen",
        "color": "#1F7A3A",
        "image": "https://images.unsplash.com/photo-1599821532311-3367b0cfdfe4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
    }
]

# region values: Central | North | South | Saurashtra | Kutch
GUJARAT_LOCATIONS = [
    {"city": "Ahmedabad", "region": "Central", "outlets": 24, "areas": ["Maninagar", "Satellite", "Bopal", "Chandkheda", "Naroda", "Vastrapur", "Nikol", "Gota"]},
    {"city": "Surat", "region": "South", "outlets": 17, "areas": ["Adajan", "Vesu", "Katargam", "Varachha", "Pal", "Sarthana"]},
    {"city": "Vadodara", "region": "Central", "outlets": 10, "areas": ["Alkapuri", "Manjalpur", "Gotri", "Waghodia Road", "Karelibaug"]},
    {"city": "Rajkot", "region": "Saurashtra", "outlets": 9, "areas": ["Kalawad Road", "University Road", "150 Ft Ring Road", "Mavdi"]},
    {"city": "Gandhinagar", "region": "Central", "outlets": 5, "areas": ["Sector 21", "Kudasan", "Sargasan"]},
    {"city": "Bhavnagar", "region": "Saurashtra", "outlets": 4, "areas": ["Waghawadi Road", "Kaliyabid"]},
    {"city": "Jamnagar", "region": "Saurashtra", "outlets": 4, "areas": ["Park Colony", "Bedi Gate"]},
    {"city": "Junagadh", "region": "Saurashtra", "outlets": 3, "areas": ["Kalwa Chowk", "Zanzarda Road"]},
    {"city": "Anand", "region": "Central", "outlets": 3, "areas": ["Anand-Vidyanagar Road", "Station Road"]},
    {"city": "Mehsana", "region": "North", "outlets": 3, "areas": ["Radhanpur Road", "Modhera Circle"]},
    {"city": "Nadiad", "region": "Central", "outlets": 2, "areas": ["College Road"]},
    {"city": "Bharuch", "region": "South", "outlets": 2, "areas": ["Zadeshwar Road"]},
    {"city": "Vapi", "region": "South", "outlets": 2, "areas": ["GIDC Char Rasta"]},
    {"city": "Valsad", "region": "South", "outlets": 2, "areas": ["Tithal Road"]},
    {"city": "Navsari", "region": "South", "outlets": 2, "areas": ["Grid Road"]},
    {"city": "Morbi", "region": "Saurashtra", "outlets": 2, "areas": ["Ravapar Road"]},
    {"city": "Surendranagar", "region": "Saurashtra", "outlets": 2, "areas": ["Ratanpar"]},
    {"city": "Gandhidham", "region": "Kutch", "outlets": 2, "areas": ["Sector 8"]},
    {"city": "Bhuj", "region": "Kutch", "outlets": 2, "areas": ["Station Road", "Hospital Road"]},
    {"city": "Porbandar", "region": "Saurashtra", "outlets": 2, "areas": ["MG Road"]},
    {"city": "Palanpur", "region": "North", "outlets": 2, "areas": ["Abu Highway"]},
    {"city": "Veraval", "region": "Saurashtra", "outlets": 1, "areas": ["Somnath Road"]},
    {"city": "Amreli", "region": "Saurashtra", "outlets": 1, "areas": ["Rajkamal Chowk"]},
    {"city": "Botad", "region": "Saurashtra", "outlets": 1, "areas": ["Paliyad Road"]},
    {"city": "Patan", "region": "North", "outlets": 1, "areas": ["Siddhpur Road"]},
    {"city": "Himatnagar", "region": "North", "outlets": 1, "areas": ["Mahavir Nagar"]},
    {"city": "Modasa", "region": "North", "outlets": 1, "areas": ["Malpur Road"]},
    {"city": "Dahod", "region": "Central", "outlets": 1, "areas": ["Godhra Road"]},
    {"city": "Godhra", "region": "Central", "outlets": 1, "areas": ["Bus Stand Road"]},
    {"city": "Kalol", "region": "North", "outlets": 1, "areas": ["Highway Circle"]},
    {"city": "Sanand", "region": "Central", "outlets": 1, "areas": ["Nalsarovar Road"]},
    {"city": "Ankleshwar", "region": "South", "outlets": 1, "areas": ["GIDC Main Road"]},
    {"city": "Dwarka", "region": "Saurashtra", "outlets": 1, "areas": ["Temple Road"]},
    {"city": "Keshod", "region": "Saurashtra", "outlets": 1, "areas": ["Junagadh Road"]},
    {"city": "Deesa", "region": "North", "outlets": 1, "areas": ["Highway Chokdi"]},
    {"city": "Jetpur", "region": "Saurashtra", "outlets": 1, "areas": ["Kanakiya Plot"]},
    {"city": "Gondal", "region": "Saurashtra", "outlets": 1, "areas": ["Bhojrajpara"]},
]

TOTAL_OUTLETS = sum(loc["outlets"] for loc in GUJARAT_LOCATIONS)
