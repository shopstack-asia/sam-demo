# SAM NPA Demo Web App

A fully functional, responsive demo web app for **SAM (Sukhumvit Asset Management)** showcasing the **NPA (Non-Performing Asset)** customer journey inside LINE LIFF.

## 🎯 Features

- **Mobile-first responsive design** optimized for LINE Rich Menu embedding
- **SAM brand theme** with custom color palette
- **Complete NPA customer journey** from property browsing to payment
- **Sticky bottom Rich Menu** with 6 navigation icons
- **Mock data integration** with realistic property listings
- **Interactive forms** for appointments and interest submission

## 🎨 SAM Brand Theme

- **Primary:** `#006E52` (SAM Green)
- **Secondary:** `#00A885` (Light Green)  
- **Accent:** `#F4F4F4` (Background)
- **Text Primary:** `#333333`
- **Text Light:** `#FFFFFF`

## 🌐 Page Structure

```
/
├── / (Landing page - NPA/NPL selection)
├── /npa (NPA main page with property cards)
├── /npa/search (Property search with filters)
├── /npa/property/[id] (Property detail page)
├── /npa/appointment (Schedule viewing form)
├── /npa/brochure (Document downloads)
├── /npa/payment (QR code payment)
├── /npa/submit-interest (Interest submission form)
├── /npa/contact (Contact information)
└── /npl (NPL placeholder - coming soon)
```

## 🏠 Landing Page

- Gradient background from SAM Green to Light Green
- Two large buttons for NPA and NPL selection
- Responsive design with hover effects

## 🏢 NPA Module

### Main Page (`/npa`)
- Fixed header with SAM branding
- Featured property cards with images, prices, and tags
- Sticky bottom Rich Menu with 6 icons:
  1. **Search Property** - Browse and filter properties
  2. **Appointment** - Schedule property viewings
  3. **Download Brochure** - Access property documents
  4. **QR Payment** - Make deposit payments
  5. **Submit Interest** - Submit interest forms
  6. **Contact** - Get in touch with support

### Property Search (`/npa/search`)
- Search input with real-time filtering
- Filter buttons for price range and location
- Property cards with tags (Hot Deal, Best Location, New Listing)
- Save to favorites functionality

### Property Details (`/npa/property/[id]`)
- Large property images with image carousel dots
- Detailed property information (size, bedrooms, bathrooms)
- Action buttons (Schedule Viewing, Save, Share, Download)
- Contact options (LINE Chat, Call)

### Appointment Scheduling (`/npa/appointment`)
- Form with personal information fields
- Date and time selection
- Confirmation with success message
- Mobile-optimized form layout

### Document Downloads (`/npa/brochure`)
- Property brochures and legal documents
- File size and format information
- Download buttons with mock functionality

### Payment (`/npa/payment`)
- QR code for deposit payment
- Payment amount: THB 50,000
- Reference: "Deposit for Condo Sukhumvit 39"
- Save QR code functionality

### Submit Interest (`/npa/submit-interest`)
- Personal information form
- Document upload area
- File format specifications
- Success confirmation

### Contact (`/npa/contact`)
- Multiple contact methods (LINE, Email, Phone)
- Office information and business hours
- Quick action buttons

## 🧱 Mock Data

The app includes realistic mock data for 6 properties with:
- Property names, locations, and prices
- High-quality placeholder images
- Tags (Hot Deal, Best Location, New Listing, Available)
- Detailed descriptions and specifications

## 🛠️ Technical Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive design** for mobile-first experience

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## 📱 Mobile Optimization

- Designed for iPhone 14 viewport and similar devices
- Touch-friendly interface with proper spacing
- Sticky navigation that works on mobile browsers
- Optimized images and fast loading

## 🎨 Design Features

- **SAM brand colors** throughout the interface
- **Rounded corners** and **shadow-md** for cards
- **Smooth transitions** and hover effects
- **Clean typography** with Inter/Poppins fonts
- **Consistent spacing** and layout grid

## 🔧 Customization

The app is built with modularity in mind:
- Easy to update mock data in `/src/data/properties.ts`
- Customizable colors in `globals.css`
- Reusable components in `/src/components/`
- Scalable page structure

## 📋 Ready for Demo

✅ Complete folder structure  
✅ Working navigation  
✅ SAM color theme  
✅ Mock data + responsive UI  
✅ Mobile-optimized for LINE Rich Menu embedding  

Perfect for showcasing the NPA customer journey in a LINE LIFF environment!