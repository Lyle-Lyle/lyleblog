![alt text](<博客(blog)_爱给网_aigei_com.png>)
LyleBlog is a practical, and elegant blogging platform designed for personal use. It features built-in traffic analytics and an image hosting service. Additionally, LyleBlog is highly extensible, offering a comprehensive admin panel that supports saving images to a self-hosted image storage and includes a powerful editor.

<div align="center">Link:http://118.25.109.39/</div>
<div align="center">Account:quanxiaoha password:quanxiaoha</div>

## UI 📸

## Features

- [x] Complete Frontend, Admin panel, Backend
- [x] Responsive Design with Tailwind CSS for Mobile Compatibility
- [x] Built with React, Engineered for Project Scalability and Easy Customization
- [x] extensible Markdown editor that easily supports features like code syntax highlighting and image zoom preview, enhancing the content creation experience.
- [x] Zustand to manage global states, such as tokens and user information.
- [x] Set up a personal image storage service using Minio and developed an API for uploading images to the storage service.
- [x] Implemented an article view count increase feature using a custom thread pool and Spring event publishing and subscribing.
- [x] Engineered daily page view (PV) count increment using Spring Boot’s @Scheduled task mechanism combined with event subscription.
- [x] Deployed backend services, MySQL, Minio, and Nginx on a cloud service provider using Docker and configured Nginx to enable Gzip compression and integrated a CDN to accelerate static resource access

## TODO

- [x] reduce JS file size, enhancing load times and overall performance.
- [ ] Add Collaborators with Custom Permissions
- [ ] Global Full-Text Search with Elasticsearch
- [ ] Internationalization (i18n)
- [ ] Configure SSL Certificates in Docker Nginx for HTTPS Support
- [ ] Subdomain Access for Image Hosting (Minio) with Nginx SSL Certificate and Reverse Proxy
- [ ] Dark mode
- [ ] CI/CD
- [ ] comment support
- [ ] fix bugs: please see issues at 

## Installation & Usage 🚀

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Run the project

```
npm start
```

## Contributing 🤝

Contributions are welcome! Follow these steps:

- Fork this repository
- Create a new branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature/your-feature)
- Open a Pull Request

## License 📄

This project is licensed under the MIT License.
