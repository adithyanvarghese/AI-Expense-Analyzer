def classify_by_keyword(description):

    description = description.lower()

    keywords = {

        "Food": [
            "restaurant",
            "swiggy",
            "zomato",
            "cafe",
            "dining",
            "food",
            "pizza",
            "burger",
            "kfc",
            "dominos",
            "mcdonald",
            "eatery",
            "bakery"
        ],

        "Fuel": [
            "fuel",
            "petrol",
            "diesel",
            "indian oil",
            "bharat petroleum",
            "hp petrol",
            "bpc",
            "ioc",
            "hpcl",
            "shell"
        ],

        "Bills": [
            "utility bill",
            "utility",
            "bill",
            "electricity",
            "water",
            "gas",
            "recharge",
            "mobile",
            "broadband",
            "airtel",
            "jio",
            "vi",
            "bsnl"
        ],

        "Grocery": [
            "grocery",
            "supermarket",
            "mart",
            "dmart",
            "big bazaar",
            "reliance fresh",
            "blinkit",
            "zepto",
            "instamart",
            "bigbasket"
        ],

        "Shopping": [
            "online purchase",
            "purchase",
            "shopping",
            "store",
            "amazon",
            "flipkart",
            "myntra",
            "ajio",
            "meesho",
            "retail"
        ],

        "Travel": [
            "uber",
            "ola",
            "rapido",
            "irctc",
            "train",
            "metro",
            "flight",
            "bus",
            "taxi",
            "toll"
        ],

        "Entertainment": [
            "netflix",
            "spotify",
            "bookmyshow",
            "movie",
            "prime",
            "hotstar",
            "cinema"
        ],

        "Healthcare": [
            "hospital",
            "apollo",
            "pharmacy",
            "clinic",
            "medical",
            "doctor"
        ],

        "Investment": [
            "mutual fund",
            "sip",
            "zerodha",
            "groww",
            "investment",
            "stocks"
        ],

        "Others": [
            "neft transfer",
            "neft",
            "upi payment",
            "upi",
            "atm withdrawal",
            "cash withdrawal",
            "transfer",
            "withdrawal"
        ]
    }

    for category, words in keywords.items():

        for word in words:

            if word in description:

                return category

    return None