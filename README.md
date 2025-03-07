<p align="center">
  <a href="https://brewfinder.app/">
    <img src="https://github.com/user-attachments/assets/5a55107b-02ee-4cd1-886a-c8d4720d2742" alt="Brewfinder Logo" width="200">
  </a>
</p>

<p align="center">
  <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fwww.brewfinder.app&style=for-the-badge">
  <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/bhyxen/brewfinder?style=for-the-badge">
  <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues-pr/bhyxen/brewfinder?style=for-the-badge">
</p>

## 📎 Content

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [📋 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Installation](#-installation)
- [🛠️ Tech Stack](#-tech-stack)
- [🗺️ Roadmap](#-roadmap)
- [👥 Contributing](#-contributing)
- [🙏 Acknowledgments](#-acknowledgments)

<!-- TOC end -->

## 📋 Overview

[Brewfinder](https://www.brewfinder.app) is a modern web application designed to simplify the discovery and management of Homebrew packages. It provides a user-friendly interface for searching, organizing, and installing packages from the Homebrew package manager, which is widely used specially on macOS but also available for Linux, and Windows (via WSL).

Whether you're a developer setting up a new environment, a data scientist managing dependencies, or a system administrator maintaining multiple machines, Brewfinder helps you create, share, and reuse package collections for consistent installations across your systems.

## ✨ Features

### Package Discovery

- **Search & Browse**: Find packages by name, description, or category
- **Detailed Information**: View comprehensive package details, dependencies, and installation statistics
- **Analytics**: Explore trending and popular packages with visual charts


### List Management

- **Create Custom Lists**: Group packages for different development environments or projects
- **Save & Share**: Save lists to your profile and share them with the community
- **Like & Discover**: Find and like useful lists created by other users


### Installation Helpers

- **Installation Scripts**: Generate ready-to-use installation scripts for your package lists
- **Copy Commands**: Easily copy installation commands for individual packages


### Community Features

- **Public Lists**: Discover curated package collections from the community
- **Feature Requests**: Submit and vote on new feature ideas for Brewfinder
- **Roadmap**: View upcoming features and development plans

## 🚀 Installation

### Prerequisites

- Node.js
- npm, pnpm, yarn or any other Node.js package manager
- Git


### Setup

1. Clone the repository:


```shellscript
git clone https://github.com/bhyxen/brewfinder.git
cd brewfinder
```

2. Install dependencies:


```shellscript
pnpm install
# or
yarn install
```

3. Set up environment variables:


```shellscript
cp .env.example .env.local
```

Edit `.env.local` with your configuration values.

4. Start the development server:


```shellscript
pnpm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons, react-simple-icons
- **Data Visualization**: Recharts
- **Authentication**: Auth.js
- **API**: Next.js API Routes
- **Database**: MongoDB and Redis

## 🗺️ Roadmap

Our development roadmap is available on the [Roadmap page](https://www.brewfinder.app/roadmap) of the application.

## 👥 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Report Bugs**: Submit issues for any bugs you encounter
2. **Suggest Features**: Have an idea? Submit a feature request
3. **Submit PRs**: Want to fix a bug or add a feature? Submit a pull request


### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/): `git commit -m 'feat: add amazing feature'`
4. Push to the branch in your forked repository: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

- [Homebrew](https://brew.sh/) for their amazing package manager
- [Homebrew Formulae API](https://formulae.brew.sh/api/) for providing package data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components