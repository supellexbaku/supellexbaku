# Next.js on Netlify Platform Starter

[Live Demo](https://nextjs-platform-starter.netlify.app/)

A modern starter based on Next.js 16 (App Router), Tailwind, and [Netlify Core Primitives](https://docs.netlify.com/core/overview/#develop) (Edge Functions, Image CDN, Blob Store).

In this site, Netlify Core Primitives are used both implictly for running Next.js features (e.g. Route Handlers, image optimization via `next/image`, and more) and also explicitly by the user code.

Implicit usage means you're using any Next.js functionality and everything "just works" when deployed - all the plumbing is done for you. Explicit usage is framework-agnostic and typically provides more features than what Next.js exposes.

## Deploying to Netlify

Click the button below to deploy this template to your Netlify account.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-platform-starter)

## Developing Locally

1. Clone this repository, then run `npm install` in its root directory.

2. For the starter to have full functionality locally (e.g. edge functions, blob store), please ensure you have an up-to-date version of Netlify CLI. Run:

```
npm install netlify-cli@latest -g
```

3. Link your local repository to the deployed Netlify site. This will ensure you're using the same runtime version for both local development and your deployed site.

```
netlify link
```

4. Then, run the Next.js development server via Netlify CLI:

```
netlify dev
```

If your browser doesn't navigate to the site automatically, visit [localhost:8888](http://localhost:8888).

## Resources

- Check out the [Next.js on Netlify docs](https://docs.netlify.com/frameworks/next-js/overview/)
<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Supellex Baku</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f7f9fc;
      color: #111;
      line-height: 1.6;
    }

    a {
      text-decoration: none;
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: auto;
    }

    header {
      background: linear-gradient(135deg, #0f172a, #1d4ed8);
      color: white;
      padding: 18px 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .logo {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .menu {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
    }

    .menu a {
      color: white;
      font-size: 15px;
      font-weight: bold;
    }

    .hero {
      background: linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.72)),
        url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat;
      color: white;
      padding: 100px 0;
    }

    .hero-content {
      max-width: 700px;
    }

    .hero h1 {
      font-size: 48px;
      line-height: 1.2;
      margin-bottom: 18px;
    }

    .hero p {
      font-size: 18px;
      margin-bottom: 28px;
      color: #e5e7eb;
    }

    .buttons {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 14px 24px;
      border-radius: 12px;
      font-weight: bold;
      transition: 0.25s ease;
    }

    .btn-primary {
      background: #ffffff;
      color: #1d4ed8;
    }

    .btn-primary:hover {
      background: #eaf1ff;
    }

    .btn-secondary {
      background: #25D366;
      color: white;
    }

    .btn-secondary:hover {
      background: #1fb95a;
    }

    section {
      padding: 70px 0;
    }

    .section-title {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-title h2 {
      font-size: 34px;
      margin-bottom: 10px;
      color: #0f172a;
    }

    .section-title p {
      color: #555;
      max-width: 700px;
      margin: auto;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
    }

    .card {
      background: white;
      padding: 24px;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
      transition: transform 0.25s ease;
    }

    .card:hover {
      transform: translateY(-5px);
    }

    .card h3 {
      margin-bottom: 12px;
      color: #1d4ed8;
      font-size: 22px;
    }

    .card p {
      color: #444;
      font-size: 15px;
    }

    .highlight {
      background: linear-gradient(135deg, #1d4ed8, #0f172a);
      color: white;
      border-radius: 22px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(29, 78, 216, 0.18);
    }

    .highlight h2 {
      margin-bottom: 16px;
      font-size: 34px;
    }

    .highlight p {
      font-size: 17px;
      color: #e5e7eb;
      margin-bottom: 22px;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      margin-top: 25px;
    }

    .feature-box {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 16px;
      padding: 18px;
    }

    .feature-box strong {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
    }

    .cta {
      text-align: center;
      background: white;
      border-radius: 20px;
      padding: 40px 20px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.07);
    }

    .cta h2 {
      font-size: 32px;
      margin-bottom: 12px;
      color: #0f172a;
    }

    .cta p {
      max-width: 650px;
      margin: 0 auto 24px;
      color: #555;
    }

    footer {
      background: #0f172a;
      color: #cbd5e1;
      padding: 30px 0;
      margin-top: 40px;
    }

    footer .footer-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    footer a {
      color: white;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 80px 0;
      }

      .hero h1 {
        font-size: 34px;
      }

      .section-title h2,
      .highlight h2,
      .cta h2 {
        font-size: 28px;
      }

      .menu {
        gap: 12px;
      }
    }
  </style>
</head>
<body>

  <header>
    <div class="container nav">
      <div class="logo">Supellex Baku</div>
      <nav class="menu">
        <a href="#home">Ana səhifə</a>
        <a href="#services">Xidmətlər</a>
        <a href="#credit">Kredit</a>
        <a href="#contact">Əlaqə</a>
      </nav>
    </div>
  </header>

  <section class="hero" id="home">
    <div class="container hero-content">
      <h1>Keyfiyyətli mebel və rahat kredit imkanları</h1>
      <p>
        Eviniz və iş yeriniz üçün zövqlü, keyfiyyətli və ölçüyə uyğun həllər təqdim edirik.
        Sifarişlə mebel, dizayn və sərfəli kredit şərtləri bir arada.
      </p>
      <div class="buttons">
        <a href="#credit" class="btn btn-primary">Kredit bölməsinə keç</a>
        <a href="https://wa.me/994554131658?text=Salam%20Supellex%20Baku%2C%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m" class="btn btn-secondary" target="_blank">WhatsApp ilə yaz</a>
      </div>
    </div>
  </section>

  <section id="services">
    <div class="container">
      <div class="section-title">
        <h2>Xidmətlərimiz</h2>
        <p>
          Müştərinin istəyinə uyğun peşəkar yanaşma, keyfiyyətli material və səliqəli iş prinsipi ilə xidmət göstəririk.
        </p>
      </div>

      <div class="cards">
        <div class="card">
          <h3>Mebel sifarişi</h3>
          <p>
            Mətbəx mebeli, dolab, TV stend, yataq otağı və digər fərdi sifarişlər ölçüyə uyğun hazırlanır.
          </p>
        </div>

        <div class="card">
          <h3>İnteryer dizayn</h3>
          <p>
            Ev və mənzillər üçün zövqlü, funksional və rahat istifadə edilən interyer həlləri təqdim olunur.
          </p>
        </div>

        <div class="card">
          <h3>Eksteryer dizayn</h3>
          <p>
            Həyət, balkon, fasad və digər xarici sahələr üçün müasir görünüşlü layihələr hazırlanır.
          </p>
        </div>

        <div class="card">
          <h3>Mərmər və qranit</h3>
          <p>
            Stolüstü, pilləkən, dekorativ hissələr və digər tətbiqlər üçün mərmər və qranit həlləri mümkündür.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="credit">
    <div class="container">
      <div class="highlight">
        <h2>Rahat kreditlə əldə edin</h2>
        <p>
          İstədiyiniz məhsulu indi seçin, ödənişi isə hissə-hissə edin. Sadə qaydalar, uyğun ilkin ödəniş və rahat aylıq planlarla xidmətinizdəyik.
        </p>

        <div class="features">
          <div class="feature-box">
            <strong>Uyğun ilkin ödəniş</strong>
            Məhsul dəyərinə görə uyğun şərtlərlə ilkin ödəniş hesablanır.
          </div>
          <div class="feature-box">
            <strong>Rahat aylıq ödəniş</strong>
            Müddətə uyğun olaraq aylıq məbləğ rahat şəkildə təqdim olunur.
          </div>
          <div class="feature-box">
            <strong>Rəsmi işi olanlara üstünlük</strong>
            Rəsmi iş yeri olan müştərilər üçün daha sərfəli yanaşma mümkündür.
          </div>
          <div class="feature-box">
            <strong>Tez müraciət</strong>
            WhatsApp ilə yazaraq daha sürətli məlumat və hesablamanı əldə edə bilərsiniz.
          </div>
        </div>

        <div class="buttons" style="margin-top:25px;">
          <a href="kredit.html" class="btn btn-primary">Kredit kalkulyatorunu aç</a>
          <a href="https://wa.me/994554131658?text=Salam%2C%20kredit%20%C5%9F%C9%99rtl%C9%99ri%20haqq%C4%B1nda%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m" class="btn btn-secondary" target="_blank">Kredit üçün yaz</a>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="cta">
        <h2>Keyfiyyət, rahatlıq və etibar</h2>
        <p>
          Məhsullarımız keyfiyyətli materiallarla hazırlanır, dizayn və ölçü isə sizin ehtiyacınıza uyğun qurulur.
          Məqsədimiz yalnız satış yox, uzunmüddətli razılıq yaratmaqdır.
        </p>
        <div class="buttons" style="justify-content:center;">
          <a href="https://wa.me/994554131658?text=Salam%20Supellex%20Baku%2C%20sifari%C5%9F%20haqq%C4%B1nda%20m%C9%99lumat%20ist%C9%99yir%C9%99m" class="btn btn-secondary" target="_blank">İndi müraciət et</a>
        </div>
      </div>
    </div>
  </section>

  <footer id="contact">
    <div class="container footer-wrap">
      <div>
        <strong>Supellex Baku</strong><br />
        Mebel • Dizayn • Kredit
      </div>
      <div>
        WhatsApp: <a href="https://wa.me/994554131658" target="_blank">055 413 16 58</a>
      </div>
    </div>
  </footer>

</body>
</html>
