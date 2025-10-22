# Platforms Art Gallery - Placeholder Image Downloader
# Run this script to quickly populate all image directories with placeholders

Write-Host "`n🎨 Platforms Art Gallery - Placeholder Setup`n" -ForegroundColor Cyan

# Check if assets directories exist
if (!(Test-Path "assets\images\hero")) {
    Write-Host "❌ Error: Asset directories not found. Please run from project root." -ForegroundColor Red
    exit 1
}

Write-Host "📥 Downloading placeholder images...`n" -ForegroundColor Yellow

# Counter for progress
$total = 27
$current = 0

function Download-Placeholder {
    param($url, $output, $description)
    $script:current++
    Write-Progress -Activity "Downloading Placeholders" -Status "$description ($current of $total)" -PercentComplete (($current / $total) * 100)
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -ErrorAction Stop
        Write-Host "  ✓ $description" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Failed: $description" -ForegroundColor Red
    }
}

# Hero Carousel Images (4)
Write-Host "`n📷 Hero Carousel Images:" -ForegroundColor Cyan
Download-Placeholder "https://placehold.co/1366x695/faf7f4/000000/jpg?text=Featured+Artwork" "assets\images\hero\hero-1.jpg" "Hero Slide 1"
Download-Placeholder "https://placehold.co/1366x695/faf7f4/000000/jpg?text=Artist+Spotlight" "assets\images\hero\hero-2.jpg" "Hero Slide 2"
Download-Placeholder "https://placehold.co/1366x695/faf7f4/000000/jpg?text=Live+Auction" "assets\images\hero\hero-3.jpg" "Hero Slide 3"
Download-Placeholder "https://placehold.co/1366x695/faf7f4/000000/jpg?text=New+Arrivals" "assets\images\hero\hero-4.jpg" "Hero Slide 4"

# Artwork Gallery Images (8)
Write-Host "`n🖼️  Artwork Gallery Images:" -ForegroundColor Cyan
for ($i = 1; $i -le 8; $i++) {
    Download-Placeholder "https://placehold.co/500x500/faf7f4/000000/jpg?text=Artwork+$i" "assets\images\artworks\artwork-$i.jpg" "Artwork $i"
}

# Artist Profile Images (5)
Write-Host "`n👤 Artist Profile Images:" -ForegroundColor Cyan
$artists = @("John Smith", "Emma Davis", "Carlos Rodriguez", "Yuki Tanaka", "Sophie Martin")
for ($i = 1; $i -le 5; $i++) {
    $name = $artists[$i-1] -replace ' ', '+'
    Download-Placeholder "https://placehold.co/500x500/d7b36c/ffffff/jpg?text=$name" "assets\images\artists\artist-$i.jpg" "Artist $i"
}

# Category Images (5)
Write-Host "`n🎭 Category Images:" -ForegroundColor Cyan
$categories = @{
    "popular" = "Popular+Art"
    "classical" = "Classical+Style"
    "modern" = "Modern+Art"
    "vintage" = "Vintage+Collection"
    "abstract" = "Abstract+Expression"
}

foreach ($cat in $categories.Keys) {
    $text = $categories[$cat]
    Download-Placeholder "https://placehold.co/600x400/e5cc9b/000000/jpg?text=$text" "assets\images\categories\category-$cat.jpg" "Category: $cat"
}

# Feature/Blog Images (5)
Write-Host "`n📰 Feature Images:" -ForegroundColor Cyan
$features = @(
    "Trending+Today",
    "Artist+Spotlight",
    "Gallery+News",
    "Art+Tips",
    "Exhibition+Event"
)

for ($i = 1; $i -le 5; $i++) {
    $text = $features[$i-1]
    Download-Placeholder "https://placehold.co/600x450/faf7f4/777777/jpg?text=$text" "assets\images\features\feature-$i.jpg" "Feature $i"
}

Write-Progress -Activity "Downloading Placeholders" -Completed

# Summary
Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
Write-Host "`n✅ Placeholder setup complete!`n" -ForegroundColor Green
Write-Host "📊 Downloaded:" -ForegroundColor Yellow
Write-Host "   • 4 Hero carousel images (1366x695px)" -ForegroundColor White
Write-Host "   • 8 Artwork gallery images (500x500px)" -ForegroundColor White
Write-Host "   • 5 Artist profile images (500x500px)" -ForegroundColor White
Write-Host "   • 5 Category images (600x400px)" -ForegroundColor White
Write-Host "   • 5 Feature images (600x450px)" -ForegroundColor White
Write-Host "   ─────────────────────────────" -ForegroundColor Gray
Write-Host "   Total: 27 placeholder images`n" -ForegroundColor Cyan

Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Open index.html in your browser" -ForegroundColor White
Write-Host "   2. Review the layout and functionality" -ForegroundColor White
Write-Host "   3. Replace placeholders with real images" -ForegroundColor White
Write-Host "   4. See ASSETS_GUIDE.md for optimization tips`n" -ForegroundColor White

Write-Host "💡 Tip: For better quality, download free art images from:" -ForegroundColor Cyan
Write-Host "   • Unsplash.com (https://unsplash.com/s/photos/art)" -ForegroundColor Gray
Write-Host "   • Pexels.com (https://pexels.com/search/artwork)" -ForegroundColor Gray
Write-Host "   • Pixabay.com (https://pixabay.com/images/search/painting/)`n" -ForegroundColor Gray

Write-Host ("=" * 60) -ForegroundColor Gray
Write-Host ""

# Open browser option
$openBrowser = Read-Host "Would you like to open index.html in your browser now? (Y/N)"
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Write-Host "`n🌐 Opening index.html in your default browser...`n" -ForegroundColor Green
    Start-Process "index.html"
} else {
    Write-Host "`n👋 Done! You can open index.html manually when ready.`n" -ForegroundColor Cyan
}
