<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ps54bTr756ZcLe4lLqHiq0bMSRWdmsjL

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the full stack (frontend + API):
   `npm run dev:full`

## Backend (Admin API)

The project includes an Express + LowDB backend for admin authentication, catalog updates, leads, and chat sessions.

* Start the API only: `npm run server`
* Default admin credentials (change after launch):
  * **Login:** `admin`
  * **Password:** `admin123`
