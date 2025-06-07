import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    browseBikes: 'Browse Bikes',
    about: 'About',
    contact: 'Contact',
    adminLogin: 'Admin Login',
    language: 'Language',
    
    // Home Page
    findPerfectRide: 'Find Your Perfect Ride',
    browseCollection: 'Browse through our extensive collection of quality second-hand bikes. From classics to modern machines, find the bike that matches your style.',
    browseBikesButton: 'Browse Bikes',
    featuredBikes: 'Featured Bikes',
    viewAllBikes: 'View all bikes',
    whyChooseUs: 'Why Choose Us',
    qualityAssured: 'Quality Assured',
    bestPrices: 'Best Prices',
    easyProcess: 'Easy Process',
    qualityAssuredDesc: 'Every bike undergoes a thorough inspection process to ensure quality and reliability.',
    bestPricesDesc: 'Get the best value for your money with our competitive pricing and transparent deals.',
    easyProcessDesc: 'Simple documentation and hassle-free buying process with our expert assistance.',
    
    // Bike Listings
    filters: 'Filters',
    search: 'Search bikes...',
    brand: 'Brand',
    model: 'Model',
    priceRange: 'Price Range',
    year: 'Year',
    applyFilters: 'Apply Filters',
    clearFilters: 'Clear Filters',
    sortBy: 'Sort By',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    newestFirst: 'Newest First',
    allBrands: 'All Brands',
    allYears: 'All Years',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    bikesFound: 'bikes found',
    
    // Bike Details
    description: 'Description',
    features: 'Features',
    documents: 'Documents',
    specifications: 'Specifications',
    contactSeller: 'Contact Seller',
    ownerName: 'Owner Name',
    callNow: 'Call Now',
    whatsapp: 'WhatsApp',
    backToBikes: 'Back to Bikes',
    bikeNotFound: 'Bike not found',
    relatedBikes: 'Related Bikes',
    
    // Common
    viewDetails: 'View Details',
    loading: 'Loading...',
    noResults: 'No results found',
    
    // Admin Dashboard
    adminDashboard: 'Admin Dashboard',
    notifications: 'Notifications',
    settings: 'Settings',
    overview: 'Overview',
    bikes: 'Bikes',
    users: 'Users',
    reports: 'Reports',
    totalBikes: 'Total Bikes',
    activeUsers: 'Active Users',
    totalRevenue: 'Total Revenue',
    locations: 'Locations',
    recentActivities: 'Recent Activities',
    newBikeAdded: 'New Bike Added',
    bikeSold: 'Bike Sold',
    newUserRegistered: 'New User Registered',
    bikeUpdated: 'Bike Updated',
    topPerformingBikes: 'Top Performing Bikes',
    views: 'Views',
    inquiries: 'Inquiries',
    status: 'Status',
    active: 'Active',
    sold: 'Sold',
    manageBikes: 'Manage Bikes',
    addNewBike: 'Add New Bike',
    manageUsers: 'Manage Users',
    addNewUser: 'Add New User',
    bikeManagementComingSoon: 'Bike management features coming soon...',
    userManagementComingSoon: 'User management features coming soon...',
    reportsComingSoon: 'Reports and analytics coming soon...',
    adminLoginSubtitle: 'Sign in to access the admin dashboard',
    username: 'Username',
    password: 'Password',
    login: 'Sign In',
    invalidCredentials: 'Invalid username or password',
    demoCredentials: 'Demo Credentials',
    logout: 'Logout',

    // Contact Page
    contactSubtitle: 'Visit our showroom in Mylavaram or get in touch with us for any inquiries',
    getInTouch: 'Get in Touch',
    showroomAddress: 'Showroom Address',
    nearBusStand: 'Near Bus Stand, Mylavaram',
    directions: 'Directions',
    directionsText: 'Our showroom is located near the bus stand in Mylavaram. You can easily reach us by bus or auto.',
    visitUs: 'Visit Us',
    bestTimeToVisit: 'Best Time to Visit',
    bestTimeToVisitDesc: 'Weekdays between 10 AM to 6 PM are ideal for a relaxed browsing experience.',
    testRide: 'Test Ride Available',
    testRideDesc: 'Schedule a test ride for any bike in our collection. Bring your driving license.',
    financing: 'Easy Financing',
    financingDesc: 'We offer flexible financing options with competitive interest rates and minimal documentation.',
    chatOnWhatsapp: 'Chat on WhatsApp',

    // Additional Admin Dashboard Translations
    addNewBikeDesc: 'Add a new bike to our collection',
    manageBikesDesc: 'Manage and update existing bikes',
    activeListings: 'Active Listings',
    bikeAdded: 'Bike Added',
    bikeDeleted: 'Bike Deleted',
    errorOccurred: 'An error occurred',
    tryAgain: 'Try Again',
    save: 'Save',
    update: 'Update',
    edit: 'Edit',
    confirm: 'Confirm',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    
    // Form Labels and Placeholders
    enterBikeName: 'Enter Bike Name',
    enterPrice: 'Enter Price',
    selectBrand: 'Select Brand',
    selectModel: 'Select Model',
    enterYear: 'Enter Year',
    enterDescription: 'Enter Description',
    enterFeatures: 'Enter Features',
    enterSpecifications: 'Enter Specifications',
    enterOwnerName: 'Enter Owner Name',
    enterPhoneNumber: 'Enter Phone Number',
    enterWhatsappNumber: 'Enter WhatsApp Number',
    
    // Validation Messages
    required: 'This field is required',
    invalidPrice: 'Enter a valid price',
    invalidYear: 'Enter a valid year',
    invalidPhone: 'Enter a valid phone number',
    minImages: 'Minimum 3 images are required',
    maxImages: 'Maximum 5 images allowed',
    imageSize: 'Image size must be less than 5MB',
    imageFormat: 'Image must be in JPG, PNG or WEBP format',
    
    // Status Messages
    processing: 'Processing...',
    uploading: 'Uploading...',
    saving: 'Saving...',
    updating: 'Updating...',
    deleting: 'Deleting...',
    successMessage: 'Operation Successful',
    errorMessage: 'Operation Failed',
    
    // Navigation and UI
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    searchAction: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    download: 'Download',
    upload: 'Upload',
    preview: 'Preview',
    submit: 'Submit',
    reset: 'Reset',
    
    // Common Actions
    view: 'View',
    editAction: 'Edit',
    deleteAction: 'Delete',
    add: 'Add',
    remove: 'Remove',
    select: 'Select',
    deselect: 'Deselect',
    enable: 'Enable',
    disable: 'Disable',
    show: 'Show',
    hide: 'Hide',
    
    // Time and Date
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    custom: 'Custom',
    
    // File Operations
    chooseFile: 'Choose File',
    dragAndDrop: 'Drag and Drop',
    fileTooLarge: 'File too large',
    invalidFileType: 'Invalid file type',
    uploadSuccess: 'Upload Successful',
    uploadFailed: 'Upload Failed',
    
    // Error Messages
    networkError: 'Network Error',
    serverError: 'Server Error',
    sessionExpired: 'Session Expired',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    notFound: 'Not Found',
    validationError: 'Validation Error',
    
    // Success Messages
    changesSaved: 'Changes Saved',
    profileUpdated: 'Profile Updated',
    settingsUpdated: 'Settings Updated',
    passwordChanged: 'Password Changed',
    accountCreated: 'Account Created',
    accountDeleted: 'Account Deleted',
    
    // Confirmation Messages
    confirmDelete: 'Are you sure you want to delete?',
    confirmLogout: 'Are you sure you want to logout?',
    confirmDiscard: 'Are you sure you want to discard changes?',
    confirmCancel: 'Are you sure you want to cancel?',
    
    // Help and Support
    help: 'Help',
    support: 'Support',
    faq: 'Frequently Asked Questions',
    contactSupport: 'Contact Support',
    reportIssue: 'Report Issue',
    feedback: 'Feedback',
  },
  te: {
    // Navigation
    home: 'హోమ్',
    browseBikes: 'బైక్‌లను బ్రౌజ్ చేయండి',
    about: 'మా గురించి',
    contact: 'సంప్రదించండి',
    adminLogin: 'అడ్మిన్ లాగిన్',
    language: 'భాష',
    
    // Home Page
    findPerfectRide: 'మీ సరైన రైడ్‌ని కనుగొనండి',
    browseCollection: 'నాణ్యమైన సెకండ్-హ్యాండ్ బైక్‌ల విస్తృత సేకరణను బ్రౌజ్ చేయండి. క్లాసిక్‌ల నుండి ఆధునిక మెషిన్‌ల వరకు, మీ స్టైల్‌కు సరిపోలే బైక్‌ని కనుగొనండి.',
    browseBikesButton: 'బైక్‌లను బ్రౌజ్ చేయండి',
    featuredBikes: 'ఫీచర్డ్ బైక్‌లు',
    viewAllBikes: 'అన్ని బైక్‌లను వీక్షించండి',
    whyChooseUs: 'మమ్మల్ని ఎందుకు ఎంచుకోవాలి',
    qualityAssured: 'నాణ్యత హామీ',
    bestPrices: 'అత్యుత్తమ ధరలు',
    easyProcess: 'సులభమైన ప్రక్రియ',
    qualityAssuredDesc: 'నాణ్యత మరియు విశ్వసనీయతను నిర్ధారించడానికి ప్రతి బైక్ ఒక సమగ్ర తనిఖీ ప్రక్రియకు లోనవుతుంది.',
    easyProcessDesc: 'మా నిపుణుల సహాయంతో సులభమైన డాక్యుమెంటేషన్ మరియు ఇబ్బంది లేని కొనుగోలు ప్రక్రియ.',
    
    // Bike Listings
    filters: 'ఫిల్టర్లు',
    search: 'బైక్‌లను వెతకండి...',
    brand: 'బ్రాండ్',
    model: 'మోడల్',
    priceRange: 'ధర పరిమితి',
    year: 'సంవత్సరం',
    applyFilters: 'ఫిల్టర్లను వర్తింపజేయండి',
    clearFilters: 'ఫిల్టర్లను క్లియర్ చేయండి',
    sortBy: 'క్రమబద్ధీకరించు',
    priceLowToHigh: 'ధర: తక్కువ నుండి ఎక్కువ',
    priceHighToLow: 'ధర: ఎక్కువ నుండి తక్కువ',
    newestFirst: 'కొత్తవి మొదట',
    allBrands: 'అన్ని బ్రాండ్‌లు',
    allYears: 'అన్ని సంవత్సరాలు',
    minPrice: 'కనిష్ట ధర',
    maxPrice: 'గరిష్ట ధర',
    bikesFound: 'బైక్‌లు కనుగొనబడ్డాయి',
    
    // Bike Details
    description: 'వివరణ',
    features: 'ఫీచర్లు',
    documents: 'డాక్యుమెంట్లు',
    specifications: 'వివరణలు',
    contactSeller: 'విక్రేతను సంప్రదించండి',
    ownerName: 'యజమాని పేరు',
    callNow: 'ఇప్పుడు కాల్ చేయండి',
    whatsapp: 'వాట్సాప్',
    backToBikes: 'బైక్‌లకు తిరిగి వెళ్లండి',
    bikeNotFound: 'బైక్ కనుగొనబడలేదు',
    relatedBikes: 'సంబంధిత బైక్‌లు',
    
    // Common
    viewDetails: 'వివరాలను వీక్షించండి',
    loading: 'లోడ్ అవుతోంది...',
    noResults: 'ఫలితాలు కనుగొనబడలేదు',
    
    // Admin Dashboard
    adminDashboard: 'అడ్మిన్ డాష్‌బోర్డ్',
    notifications: 'నోటిఫికేషన్‌లు',
    settings: 'సెట్టింగ్‌లు',
    overview: 'అవలోకనం',
    bikes: 'బైక్‌లు',
    users: 'వినియోగదారులు',
    reports: 'నివేదికలు',
    totalBikes: 'మొత్తం బైక్‌లు',
    activeUsers: 'యాక్టివ్ వినియోగదారులు',
    totalRevenue: 'మొత్తం ఆదాయం',
    locations: 'స్థానాలు',
    recentActivities: 'ఇటీవలి కార్యకలాపాలు',
    newBikeAdded: 'కొత్త బైక్ జోడించబడింది',
    bikeSold: 'బైక్ అమ్మబడింది',
    newUserRegistered: 'కొత్త వినియోగదారు నమోదు చేయబడ్డారు',
    bikeUpdated: 'బైక్ నవీకరించబడింది',
    topPerformingBikes: 'అత్యుత్తమ ప్రదర్శన బైక్‌లు',
    views: 'వీక్షణలు',
    inquiries: 'అడిగినవి',
    status: 'స్థితి',
    active: 'యాక్టివ్',
    sold: 'అమ్మబడింది',
    manageBikes: 'బైక్‌లను నిర్వహించండి',
    addNewBike: 'కొత్త బైక్ జోడించండి',
    manageUsers: 'వినియోగదారులను నిర్వహించండి',
    addNewUser: 'కొత్త వినియోగదారును జోడించండి',
    bikeManagementComingSoon: 'బైక్ నిర్వహణ ఫీచర్లు త్వరలో వస్తాయి...',
    userManagementComingSoon: 'వినియోగదారు నిర్వహణ ఫీచర్లు త్వరలో వస్తాయి...',
    reportsComingSoon: 'నివేదికలు మరియు విశ్లేషణలు త్వరలో వస్తాయి...',
    adminLoginSubtitle: 'అడ్మిన్ డాష్‌బోర్డ్‌కు ప్రవేశించడానికి సైన్ ఇన్ చేయండి',
    username: 'వినియోగదారు పేరు',
    password: 'పాస్‌వర్డ్',
    login: 'సైన్ ఇన్',
    invalidCredentials: 'చెల్లని వినియోగదారు పేరు లేదా పాస్‌వర్డ్',
    demoCredentials: 'డెమో ధృవీకరణలు',
    logout: 'లాగ్‌అవుట్',
    welcomeBack: 'స్వాగతం',
    bikeDetails: 'బైక్ వివరాలు',
    price: 'ధర',
    colors: 'రంగులు',
    finance: 'ఫైనాన్స్',
    actions: 'చర్యలు',
    delete: 'తొలగించు',
    cancel: 'రద్దు చేయండి',
    addBike: 'బైక్ జోడించండి',
    bikeName: 'బైక్ పేరు',
    priceInRupees: 'ధర (₹)',
    addColor: 'రంగు జోడించండి',
    images: 'చిత్రాలు',
    minimumImages: 'కనీసం 3 చిత్రాలు',
    maximumImages: 'గరిష్టంగా 5 చిత్రాలు',
    uploadImage: 'చిత్రం అప్‌లోడ్ చేయండి',
    firstImageMain: 'మొదటి చిత్రం ప్రధాన ప్రదర్శన చిత్రంగా ఉపయోగించబడుతుంది',
    financeAvailable: 'ఫైనాన్స్ అందుబాటులో ఉంది',
    yes: 'అవును',
    no: 'కాదు',
    bikeAddedSuccess: 'బైక్ విజయవంతంగా జోడించబడింది',
    deleteConfirmation: 'ఈ బైక్‌ని తొలగించాలని ఖచ్చితంగా ఉన్నారా?',
    bikeDeletedSuccess: 'బైక్ విజయవంతంగా తొలగించబడింది',
    aboutUs: 'మా గురించి',
    services: 'సేవలు',
    servicesDesc: 'మేము వివిధ రకాల టూ-వీలర్‌లను సరైన ఫైనాన్స్ ఎంపికలతో అందిస్తాము. మైలవరంలో మా షోరూమ్ టాప్ తయారీదారుల బైక్‌ల ఉత్తమ సేకరణను అందిస్తుంది, నాణ్యత మరియు కస్టమర్ సంతృప్తిని నిర్ధారిస్తుంది.',

    // Contact Page
    contactSubtitle: 'మైలవరంలో మా షోరూమ్‌ని సందర్శించండి లేదా ఏదైనా ప్రశ్నల కోసం మమ్మల్ని సంప్రదించండి',
    getInTouch: 'సంప్రదించండి',
    showroomAddress: 'షోరూమ్ చిరునామా',
    nearBusStand: 'బస్ స్టాండ్ సమీపంలో, మైలవరం',
    directions: 'దిశలు',
    directionsText: 'మా షోరూమ్ మైలవరంలో బస్ స్టాండ్ సమీపంలో ఉంది. బస్ లేదా ఆటో ద్వారా మమ్మల్ని సులభంగా చేరుకోవచ్చు.',
    visitUs: 'మమ్మల్ని సందర్శించండి',
    bestTimeToVisit: 'సందర్శించడానికి ఉత్తమ సమయం',
    bestTimeToVisitDesc: 'రిలాక్స్‌డ్ బ్రౌజింగ్ అనుభవం కోసం వారపు రోజుల్లో ఉదయం 10 నుండి సాయంత్రం 6 వరకు సందర్శించడం అనువైనది.',
    testRide: 'టెస్ట్ రైడ్ అందుబాటులో ఉంది',
    testRideDesc: 'మా సేకరణలో ఉన్న ఏదైనా బైక్‌కు టెస్ట్ రైడ్‌ని షెడ్యూల్ చేయండి. మీ డ్రైవింగ్ లైసెన్స్‌ని తీసుకురావండి.',
    financing: 'సులభమైన ఫైనాన్సింగ్',
    financingDesc: 'పోటీ వడ్డీ రేట్లు మరియు కనిష్ట డాక్యుమెంటేషన్‌తో వశ్యత ఫైనాన్సింగ్ ఎంపికలను అందిస్తాము.',
    chatOnWhatsapp: 'వాట్సాప్‌లో చాట్ చేయండి',

    // Additional Admin Dashboard Translations
    addNewBikeDesc: 'కొత్త బైక్‌ని మా సేకరణలో జోడించండి',
    manageBikesDesc: 'ఉన్న బైక్‌లను నిర్వహించండి మరియు నవీకరించండి',
    activeListings: 'యాక్టివ్ లిస్టింగ్‌లు',
    bikeAdded: 'బైక్ జోడించబడింది',
    bikeDeleted: 'బైక్ తొలగించబడింది',
    errorOccurred: 'లోపం సంభవించింది',
    tryAgain: 'మళ్లీ ప్రయత్నించండి',
    save: 'సేవ్ చేయండి',
    update: 'నవీకరించండి',
    edit: 'సవరించండి',
    confirm: 'నిర్ధారించండి',
    success: 'విజయవంతమైంది',
    error: 'లోపం',
    warning: 'హెచ్చరిక',
    info: 'సమాచారం',
    
    // Form Labels and Placeholders
    enterBikeName: 'బైక్ పేరు నమోదు చేయండి',
    enterPrice: 'ధర నమోదు చేయండి',
    selectBrand: 'బ్రాండ్‌ని ఎంచుకోండి',
    selectModel: 'మోడల్‌ని ఎంచుకోండి',
    enterYear: 'సంవత్సరం నమోదు చేయండి',
    enterDescription: 'వివరణ నమోదు చేయండి',
    enterFeatures: 'ఫీచర్లు నమోదు చేయండి',
    enterSpecifications: 'వివరణలు నమోదు చేయండి',
    enterOwnerName: 'యజమాని పేరు నమోదు చేయండి',
    enterPhoneNumber: 'ఫోన్ నంబర్ నమోదు చేయండి',
    enterWhatsappNumber: 'వాట్సాప్ నంబర్ నమోదు చేయండి',
    
    // Validation Messages
    required: 'ఈ ఫీల్డ్ అవసరం',
    invalidPrice: 'చెల్లుబాటు అయ్యే ధరను నమోదు చేయండి',
    invalidYear: 'చెల్లుబాటు అయ్యే సంవత్సరాన్ని నమోదు చేయండి',
    invalidPhone: 'చెల్లుబాటు అయ్యే ఫోన్ నంబర్‌ని నమోదు చేయండి',
    minImages: 'కనీసం 3 చిత్రాలు అవసరం',
    maxImages: 'గరిష్టంగా 5 చిత్రాలు మాత్రమే అనుమతించబడతాయి',
    imageSize: 'చిత్రం పరిమాణం 5MB కంటే తక్కువగా ఉండాలి',
    imageFormat: 'చిత్రం JPG, PNG లేదా WEBP ఫార్మాట్‌లో ఉండాలి',
    
    // Status Messages
    processing: 'ప్రాసెస్ అవుతోంది...',
    uploading: 'అప్‌లోడ్ అవుతోంది...',
    saving: 'సేవ్ అవుతోంది...',
    updating: 'నవీకరణ అవుతోంది...',
    deleting: 'తొలగింపు అవుతోంది...',
    successMessage: 'ఆపరేషన్ విజయవంతమైంది',
    errorMessage: 'ఆపరేషన్ విఫలమైంది',
    
    // Navigation and UI
    back: 'వెనుకకు',
    next: 'తర్వాత',
    previous: 'మునుపటి',
    close: 'మూసివేయండి',
    open: 'తెరవండి',
    searchAction: 'వెతకండి',
    filter: 'ఫిల్టర్',
    sort: 'క్రమబద్ధీకరించు',
    refresh: 'రిఫ్రెష్',
    download: 'డౌన్‌లోడ్',
    upload: 'అప్‌లోడ్',
    preview: 'ప్రివ్యూ',
    submit: 'సమర్పించండి',
    reset: 'రీసెట్',
    
    // Common Actions
    view: 'వీక్షించండి',
    editAction: 'సవరించండి',
    deleteAction: 'తొలగించండి',
    add: 'జోడించండి',
    remove: 'తీసేయండి',
    select: 'ఎంచుకోండి',
    deselect: 'ఎంపికను తీసేయండి',
    enable: 'ఎనేబుల్ చేయండి',
    disable: 'డిసేబుల్ చేయండి',
    show: 'చూపించండి',
    hide: 'దాచండి',
    
    // Time and Date
    today: 'ఈరోజు',
    yesterday: 'నిన్న',
    thisWeek: 'ఈ వారం',
    thisMonth: 'ఈ నెల',
    lastMonth: 'గత నెల',
    custom: 'కస్టమ్',
    
    // File Operations
    chooseFile: 'ఫైల్‌ని ఎంచుకోండి',
    dragAndDrop: 'ఫైల్‌ని ఇక్కడ లాగండి లేదా డ్రాప్ చేయండి',
    fileTooLarge: 'ఫైల్ పరిమాణం చాలా పెద్దది',
    invalidFileType: 'చెల్లని ఫైల్ రకం',
    uploadSuccess: 'అప్‌లోడ్ విజయవంతమైంది',
    uploadFailed: 'అప్‌లోడ్ విఫలమైంది',
    
    // Error Messages
    networkError: 'నెట్‌వర్క్ లోపం సంభవించింది',
    serverError: 'సర్వర్ లోపం సంభవించింది',
    sessionExpired: 'సెషన్ గడువు ముగిసింది',
    unauthorized: 'అనధికృత ప్రాప్యత',
    forbidden: 'నిషేధించబడింది',
    notFound: 'కనుగొనబడలేదు',
    validationError: 'ధృవీకరణ లోపం',
    
    // Success Messages
    changesSaved: 'మార్పులు సేవ్ చేయబడ్డాయి',
    profileUpdated: 'ప్రొఫైల్ నవీకరించబడింది',
    settingsUpdated: 'సెట్టింగ్‌లు నవీకరించబడ్డాయి',
    passwordChanged: 'పాస్‌వర్డ్ మార్చబడింది',
    accountCreated: 'ఖాతా సృష్టించబడింది',
    accountDeleted: 'ఖాతా తొలగించబడింది',
    
    // Confirmation Messages
    confirmDelete: 'తొలగించాలని ఖచ్చితంగా ఉన్నారా?',
    confirmLogout: 'లాగ్‌అవుట్ చేయాలని ఖచ్చితంగా ఉన్నారా?',
    confirmDiscard: 'మార్పులను విస్మరించాలని ఖచ్చితంగా ఉన్నారా?',
    confirmCancel: 'రద్దు చేయాలని ఖచ్చితంగా ఉన్నారా?',
    
    // Help and Support
    help: 'సహాయం',
    support: 'సపోర్ట్',
    faq: 'తరచుగా అడిగే ప్రశ్నలు',
    contactSupport: 'సపోర్ట్‌ని సంప్రదించండి',
    reportIssue: 'సమస్యను నివేదించండి',
    feedback: 'ఫీడ్‌బ్యాక్',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 