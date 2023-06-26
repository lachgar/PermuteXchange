# PermuteXchange Documentation/Manual

## Introduction
Welcome to the PermuteXchange Documentation/Manual! This guide provides detailed information about the features, functionalities, and usage of the PermuteXchange web-based platform. PermuteXchange is designed to streamline and enhance faculty exchange programs within higher education institutions in Morocco. It empowers professors to connect, search for potential exchange partners, and initiate discussions for exchange opportunities. By leveraging advanced algorithmic techniques, PermuteXchange optimizes resource allocation and strategically arranges professors based on their expertise and disciplinary requirements.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Installation
To use PermuteXchange, you need to follow these installation steps:

1. Clone the repository: `git clone https://github.com/permutexchange.git`
2. Install the required dependencies:
   - For the backend, navigate to the backend directory and run `npm install`.
   - For the frontend, navigate to the frontend directory and run `npm install`.
3. Set up the MongoDB database:
   - Create a MongoDB database.
   - Update the MongoDB connection string in the `backend/config/config.js` file.
4. Build the frontend:
   - Navigate to the frontend directory and run `npm run build`.
   - The production-ready build will be generated in the `frontend/build` directory.
5. Start the application:
   - In the backend directory, run `npm start` to start the server.
6. Access the application through [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
Once the installation is complete and the application is running, you can use PermuteXchange to:

- Register as a professor and provide your specialty, current city, and desired cities.
- Search for potential exchange partners based on specialization and desired locations.
- Initiate discussions with potential exchange partners through integrated messaging functionality.
- View and manage your profile, exchange preferences, and communication history.
- Analyze the generated cycles and relationships within the graph.

For a detailed guide on how to use PermuteXchange, please refer to the User Guide.

## Features
PermuteXchange offers the following key features:

- User registration and profile management.
- Advanced search capabilities to find suitable exchange partners.
- Integrated messaging functionality for secure communication.
- Visualization of cycles and relationships within the graph.
- User-friendly interface and intuitive user experience.
- Secure storage and protection of personal information.

For a comprehensive overview of the features and functionalities, please refer to the Feature Guide.

## Contributing
We welcome contributions to the PermuteXchange project. If you have any ideas, bug fixes, or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Make the necessary changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request with a detailed description of your contribution.

Please review the Contribution Guidelines for more information.

## Support
If you have any questions, issues, or feedback regarding PermuteXchange, please contact our support team at lachgar.m@ucd.ac.ma.

## License
PermuteXchange is licensed under the MIT License. See the LICENSE file for more details.

We hope you find this documentation/manual helpful in understanding and using the PermuteXchange.
