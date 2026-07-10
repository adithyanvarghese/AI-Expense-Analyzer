def classify_by_keyword(description):

    description = description.lower()

    keywords = {

        "Food": [
            "swiggy",
            "zomato",
            "restaurant",
            "pizza",
            "burger",
            "kfc",
            "dominos",
            "mcdonald",
            "food",
            "cafe"
        ],

        "Travel": [
            "uber",
            "ola",
            "irctc",
            "train",
            "metro",
            "flight",
            "bus",
            "taxi"
        ],

        "Shopping": [
            "amazon",
            "flipkart",
            "myntra",
            "ajio",
            "shopping",
            "store"
        ],

        "Entertainment": [
            "netflix",
            "spotify",
            "bookmyshow",
            "movie",
            "prime",
            "hotstar"
        ],

        "Fuel": [
            "petrol",
            "diesel",
            "indian oil",
            "bharat petroleum",
            "hp petrol",
            "fuel"
        ],

        "Healthcare": [
            "hospital",
            "apollo",
            "pharmacy",
            "clinic",
            "medical"
        ],

        "Bills": [
            "electricity",
            "water bill",
            "internet",
            "wifi",
            "airtel",
            "jio",
            "bsnl",
            "bill"
        ],

        "Grocery": [
            "dmart",
            "big bazaar",
            "reliance fresh",
            "grocery",
            "supermarket"
        ],

        "Investment": [
            "mutual fund",
            "sip",
            "zerodha",
            "groww",
            "investment"
        ]
    }

    for category, words in keywords.items():

        for word in words:

            if word in description:

                return category

    return None