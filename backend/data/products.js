//! Important notice: category has changed to categoryName

//! Ratings are removed! Also images

//! countInStock is changed to boolean


//* Sample Product for postman: 
// {
//   "name": "Organic Chamomile Tea Bags",
//   "description": "Relax with the calming aroma of organic chamomile tea. Naturally caffeine-free and soothing.",
//   "originalPrice": 13.99,
//   "discountPrice": 11.99,
//   "countInStock": 40,
//   "categoryName": "Groceries",
//   "brand": "PureLeaf",
// }
//* Sample Product for postman

const products = [
  {
    "name": "Smartphone Fast Charger",
    "description": "Charge your devices quickly and efficiently with this high-speed smartphone charger. Compatible with most USB-C and Lightning devices.",
    "price": 29.99,
    "discountPrice": 24.99,
    "countInStock": true,
    "category": "67d1e2d7128cc0b78dc91837",
    "brand": "TechBoost",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=55",
        "altText": "Smartphone Fast Charger Front View"
      },
      {
        "url": "https://picsum.photos/500/500?random=56",
        "altText": "Smartphone Fast Charger In Use"
      }
    ],
    "reviews": [],
    "numReviews": 19
  },
  {
    "name": "Men's Slim-Fit Jeans",
    "description": "Stay stylish with these slim-fit jeans. Crafted from high-quality denim, they offer a comfortable and modern fit.",
    "price": 49.99,
    "discountPrice": 39.99,
    "countInStock": 25,
    "category": "67d1e2d7128cc0b78dc91838",
    "brand": "DenimEdge",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=57",
        "altText": "Men's Slim-Fit Jeans Front View"
      },
      {
        "url": "https://picsum.photos/500/500?random=58",
        "altText": "Men's Slim-Fit Jeans Back View"
      }
    ],
    "reviews": [],
    "numReviews": 30
  },
  {
    "name": "Stainless Steel Chef Knife",
    "description": "Precision-crafted stainless steel chef knife for all your culinary needs. Ergonomic handle for comfortable grip.",
    "price": 39.99,
    "discountPrice": 29.99,
    "countInStock": 40,
    "category": "67d1e2d7128cc0b78dc91839",
    "brand": "BladePro",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=59",
        "altText": "Stainless Steel Chef Knife"
      },
      {
        "url": "https://picsum.photos/500/500?random=60",
        "altText": "Stainless Steel Chef Knife In Use"
      }
    ],
    "reviews": [],
    "numReviews": 45
  },
  {
    "name": "Hydrating Face Moisturizer",
    "description": "Lightweight and nourishing face moisturizer that keeps your skin hydrated all day. Suitable for all skin types.",
    "price": 19.99,
    "discountPrice": 16.99,
    "countInStock": 60,
    "category": "67d1e2d7128cc0b78dc9183a",
    "brand": "SkinGlow",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=61",
        "altText": "Hydrating Face Moisturizer Bottle"
      },
      {
        "url": "https://picsum.photos/500/500?random=62",
        "altText": "Hydrating Face Moisturizer Applied"
      }
    ],
    "reviews": [],
    "numReviews": 38
  },
  {
    "name": "Yoga Mat with Carrying Strap",
    "description": "Comfortable and durable yoga mat with non-slip texture. Comes with a convenient carrying strap for easy transport.",
    "price": 34.99,
    "discountPrice": 29.99,
    "countInStock": 20,
    "category": "67d1e2d7128cc0b78dc9183b",
    "brand": "FlexMat",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=63",
        "altText": "Yoga Mat with Carrying Strap"
      },
      {
        "url": "https://picsum.photos/500/500?random=64",
        "altText": "Yoga Mat in Use"
      }
    ],
    "reviews": [],
    "numReviews": 26
  },
  {
    "name": "Interactive Learning Tablet for Kids",
    "description": "A fun and educational tablet designed for kids, featuring interactive games and learning activities.",
    "price": 69.99,
    "discountPrice": 59.99,
    "countInStock": 15,
    "category": "67d1e2d7128cc0b78dc9183c",
    "brand": "EduPlay",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=65",
        "altText": "Interactive Learning Tablet for Kids Front View"
      },
      {
        "url": "https://picsum.photos/500/500?random=66",
        "altText": "Interactive Learning Tablet Screen Display"
      }
    ],
    "reviews": [],
    "numReviews": 34
  },
  {
    "name": "Premium Car Wax Kit",
    "description": "Protect and shine your car with this high-quality car wax kit. Easy application and long-lasting protection.",
    "price": 29.99,
    "discountPrice": 24.99,
    "countInStock": 18,
    "category": "67d1e2d7128cc0b78dc9183d",
    "brand": "ShineGuard",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=67",
        "altText": "Premium Car Wax Kit Front View"
      },
      {
        "url": "https://picsum.photos/500/500?random=68",
        "altText": "Premium Car Wax Kit Application"
      }
    ],
    "reviews": [],
    "numReviews": 20
  },
  {
    "name": "Organic Green Tea Bags",
    "description": "Enjoy the refreshing taste of organic green tea. Packed with antioxidants and naturally soothing.",
    "price": 14.99,
    "discountPrice": 12.99,
    "countInStock": 50,
    "category": "67d1e2d7128cc0b78dc9183f",
    "brand": "PureLeaf",
    "images": [
      {
        "url": "https://picsum.photos/500/500?random=69",
        "altText": "Organic Green Tea Bags Front View"
      },
      {
        "url": "https://picsum.photos/500/500?random=70",
        "altText": "Organic Green Tea Brewed"
      }
    ],
    "reviews": [],
    "numReviews": 42
  }
]


  
  module.exports = products;