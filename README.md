# Wardrobify

Wardrobify is an innovative application that brings fashion to your fingertips! With a team of talented full stack
software engineers, including Christie and Vincent, who have built powerful microservices for hats and shoes, Wardrobify
offers a seamless experience for managing your wardrobe collection.

## Team

* **Christie (Full Stack Software Engineer)**: Leading the development of the Hats microservice, Christie brings her
  expertise in creating a smooth and user-friendly front-end experience for managing hats.
* **Vincent (Full Stack Software Engineer)**: Spearheading the development of the Shoes microservice, Vincent utilizes
  his technical prowess to build robust APIs and backend functionality for managing shoes.

## Design

Wardrobify is designed to provide users with a convenient way to view, create, and manage their hats and shoes. The
application is built using a combination of front-end React files and back-end APIs for Hats, Shoes, and Wardrobe, all
working seamlessly together to deliver a comprehensive wardrobe management solution.

Within the repository, you'll find four main directories:

* `ghi`: Contains the front-end React files, where Christie and Vincent have crafted an intuitive user interface that
  offers an enjoyable experience for managing hats and shoes.
* `hats`: Contains the back-end API for managing hats, developed by Christie. The API offers endpoints for retrieving a
  list of hats, creating new hats, and deleting hats, making wardrobe management a breeze.
* `shoes`: Contains the back-end API for managing shoes, developed by Vincent. The API provides endpoints for retrieving
  a list of shoes, creating new shoes, and deleting shoes, ensuring a seamless experience for shoe enthusiasts.
* `wardrobe`: Contains the back-end API for managing wardrobe locations and bins. This API is leveraged by both the hats
  and shoes microservices to fetch location and bin data, making it easy to keep track of where your fashion items are
  stored.

## Shoes microservice

Vincent's Shoes microservice is built on two main models: Shoe and BinVO. The Shoe model has a bin property that
establishes a ForeignKey relationship with BinVO.

To fetch bin data, Vincent has implemented a polling function called `get_bins()` that makes requests to the Wardrobe
API's bins endpoint and accesses the bin data. This allows users to view the available bins when creating a new shoe.

Vincent has also created RESTful APIs with endpoints for getting a list of shoes, creating new shoes, and deleting
shoes. On the front-end, Vincent has developed two components, ShoeList and ShoeForm, utilizing useState and useEffect
hooks to provide a smooth and interactive user experience.

## Hats microservice

Christie's Hats microservice is built on two main models: Hat and LocationVO. The Hat model has a location property that
establishes a ForeignKey relationship with LocationVO.

To fetch location data, Christie has implemented a polling function called `get_locations()` that makes requests to the
Wardrobe API's locations endpoint and accesses the location data. This enables users to select from available locations
when creating a new hat.

Christie has also created RESTful APIs with endpoints for getting a list of hats, creating new hats, and deleting hats.
On the front-end, Christie has developed two components, HatList and HatForm, utilizing setState and componentDidMount
class components to offer a seamless user experience.

## Getting Started

To get started with Wardrobify, follow the steps below:

### Prerequisites

* Node.js and npm installed on your local machine
* Access to the Wardrobe API for fetching location and bin data

### Installation

1. Clone the Wardrobify repository to your local machine.
2. Navigate to the `ghi` directory and run `npm install` to install the front-end dependencies.
3. Navigate to the `hats` directory and run `npm install` to install the back-end dependencies for managing hats.
4. Navigate to the `shoes` directory and run `npm install` to install the back-end dependencies for managing shoes.
5. Set up the Wardrobe API credentials in the respective microservices (hats and shoes) to fetch location and bin data.
6. Start the front-end React application by running `npm start` in the `ghi` directory.
7. Start the back-end microservices for hats and shoes by running `npm start` in the `hats` and `shoes` directories,
   respectively.

### Usage

Once the application is up and running, you can access the Wardrobify application in your web browser. You can view a
list of hats and shoes, create new hats and shoes, and delete hats and shoes as needed. The intuitive user interface and
smooth functionalities