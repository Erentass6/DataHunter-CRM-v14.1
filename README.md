# DataHunter — Real Estate Lead Desk Prototype

A Node.js prototype that combines a small lead-management interface with a Puppeteer-based browser-automation experiment for location-based business listings.

## What it demonstrates

- Express API endpoints for reading saved records and updating notes
- MongoDB persistence for collected business details
- A browser-based workflow built with Puppeteer
- A simple dashboard for reviewing records

## Stack

Node.js · Express · Puppeteer · MongoDB · HTML/CSS/JavaScript

## Run locally

1. Install Node.js and npm.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set a MongoDB connection string in your shell. In PowerShell:

   ```powershell
   $env:MONGODB_URL = "mongodb+srv://<username>:<password>@<cluster>/<database>"
   ```

4. Start the server:

   ```bash
   node server.js
   ```

The browser automation requires a desktop browser environment. The interface can be opened from the local project files while the API server is running.

## Responsible-use note

This is an experimental prototype, not a production scraping service. Browser automation can break when third-party pages change and may be restricted by their terms. Use only where you have permission, respect applicable terms and privacy rules, and do not assume this project bypasses access controls.

## Security

The MongoDB connection is read from the `MONGODB_URL` environment variable. Never commit database credentials or local `.env` files. If a credential was already committed, rotate it at the provider; removing it from the latest source does not remove older Git history.

## Attribution

The original project README credits Difference Agency and lists Serhat Ezibay and Eren Taş as developers.
