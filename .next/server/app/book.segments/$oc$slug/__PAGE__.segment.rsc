1:"$Sreact.fragment"
2:T3037,

    <header class="site-header">
      <div class="container">
        <a href="/home" class="brand">
          <img class="brand-mark" src="/images/posh-passage-logo.png" alt="">
          <span class="brand-word">Posh Passage<span>LIMOUSINES</span></span>
        </a>
        <nav class="nav-primary">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/service">Services</a>
          <a href="/fleet">Fleet</a>
          <a href="/book">Book a Ride</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </nav>
        <div class="header-actions">
          <a href="tel:+16723773932" class="call-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (672) 377-3932
          </a>
          <a href="/book" class="btn btn-primary btn-sm">Book a Ride</a>
          <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
        </div>
      </div>
    </header>

    <main>

      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Book a Ride</p>
          <h1>Book Your Surrey<br>Limousine or Party Bus.</h1>
          <p class="lede">Fill in the details below and we'll confirm your chauffeur by email or phone. Need it today?
            Call us directly — <a href="tel:+16723773932" style="color:var(--ivory); text-decoration:underline;">(672)
              377-3932</a>.</p>
        </div>
      </section>

      <section class="section-tight">
        <div class="container">
          <div class="two-col" style="grid-template-columns:1.6fr 1fr;">

            <div class="form-panel reveal">
              <form id="booking-form" action="/api/booking" method="POST">

                <div class="field-row">
                  <div class="field">
                    <label for="name">Full name <span class="req">*</span></label>
                    <input type="text" id="name" name="name" placeholder="Jane Doe" required>
                  </div>

                  <div class="field">
                    <label for="phone">Phone <span class="req">*</span></label>
                    <input type="tel" id="phone" name="phone" placeholder="(604) 555-0123" required>
                  </div>
                </div>

                <div class="field">
                  <label for="email">Email <span class="req">*</span></label>
                  <input type="email" id="email" name="email" placeholder="jane@email.com" required>
                </div>

                <div class="field-row">
                  <div class="field">
                    <label for="occasion">Occasion</label>
                    <select id="occasion" name="occasion">
                      <option value="">Select an occasion</option>
                      <option>Airport Transfers</option>
                      <option>Corporate &amp; Executive Travel</option>
                      <option>Weddings</option>
                      <option>Prom &amp; Graduation</option>
                      <option>Birthdays &amp; Anniversaries</option>
                      <option>Bachelor &amp; Bachelorette Parties</option>
                      <option>Concerts &amp; Sporting Events</option>
                      <option>Wine &amp; Brewery Tours</option>
                      <option>Whistler Ski &amp; Resort Trips</option>
                      <option>Quinceañeras &amp; Celebrations</option>
                      <option>Party Bus Nights Out</option>
                      <option>Funeral &amp; Memorial Transportation</option>
                      <option>Hourly &amp; Point-to-Point Charter</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div class="field">
                    <label for="vehicle">Vehicle preference</label>
                    <select id="vehicle" name="vehicle">
                      <option value="">Not sure — recommend one</option>
                      <option>Stretch Limousine</option>
                      <option>SUV Limousine</option>
                      <option>Sprinter</option>
                      <option>Party Bus</option>
                    </select>
                  </div>
                </div>

                <div class="field-row-3">
                  <div class="field">
                    <label for="pickup-date">Pickup date <span class="req">*</span></label>
                    <input type="date" id="pickup-date" name="pickup-date" required>
                  </div>

                  <div class="field">
                    <label for="pickup-time">Pickup time <span class="req">*</span></label>
                    <input type="time" id="pickup-time" name="pickup-time" required>
                  </div>

                  <div class="field">
                    <label for="passengers">Passengers</label>
                    <input type="number" id="passengers" name="passengers" min="1" max="40" placeholder="e.g. 8">
                  </div>
                </div>

                <div class="field">
                  <label for="pickup">Pickup location <span class="req">*</span></label>
                  <input type="text" id="pickup" name="pickup" placeholder="Address or venue name" required>
                </div>

                <div class="field">
                  <label for="dropoff">Drop-off location</label>
                  <input type="text" id="dropoff" name="dropoff" placeholder="Address or venue name (if known)">
                </div>

                <div class="field">
                  <label>Trip type</label>

                  <div class="radio-set">
                    <label>
                      <input type="radio" name="trip-type" value="One-way" checked>
                      One-way
                    </label>

                    <label>
                      <input type="radio" name="trip-type" value="Round-trip">
                      Round-trip
                    </label>

                    <label>
                      <input type="radio" name="trip-type" value="Hourly / As Directed">
                      Hourly / As directed
                    </label>
                  </div>
                </div>

                <div class="field">
                  <label for="notes">Special requests</label>

                  <textarea id="notes" name="notes" rows="4"
                    placeholder="Stops along the way, car seats, decorations, anything else we should know"></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                  Request This Ride
                </button>

                <p class="form-note"></p>

              </form>
            </div>

            <aside class="reveal">
              <div class="card" style="margin-bottom:20px;">
                <p class="eyebrow" style="margin-bottom:14px;">What Happens Next</p>
                <div style="display:flex; flex-direction:column; gap:16px;">
                  <div style="display:flex; gap:12px;">
                    <span
                      style="font-family:var(--font-display); color:var(--garnet-light); font-size:1.3rem; flex-shrink:0;">1</span>
                    <p style="font-size:.92rem;">Fill in your details and hit <strong
                        style="color:var(--ivory);">Request
                        This Ride</strong>.</p>
                  </div>
                  <div style="display:flex; gap:12px;">
                    <span
                      style="font-family:var(--font-display); color:var(--garnet-light); font-size:1.3rem; flex-shrink:0;">2</span>
                    <p style="font-size:.92rem;">Your complete request is sent securely to our Gmail inbox.</p>
                  </div>
                  <div style="display:flex; gap:12px;">
                    <span
                      style="font-family:var(--font-display); color:var(--garnet-light); font-size:1.3rem; flex-shrink:0;">3</span>
                    <p style="font-size:.92rem;">We confirm availability and send back a straightforward quote.</p>
                  </div>
                </div>
              </div>
              <div class="card">
                <p class="eyebrow" style="margin-bottom:12px;">Prefer To Talk It Through?</p>
                <p style="font-size:.92rem; margin-bottom:18px;">Same-day and urgent requests are always faster by
                  phone.
                </p>
                <a href="tel:+16723773932" class="btn btn-primary btn-block">Call (672) 377-3932</a>
              </div>
            </aside>

          </div>
        </div>
      </section>

    </main>

    <footer class="site-footer">
      <svg class="footer-skyline" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0,260 L90,185 L170,225 L250,150 L330,205 L430,135 L525,215 L620,165 L715,235 L810,175 L905,225 L1000,155 L1100,215 L1200,185 L1300,235 L1440,195 L1440,400 L0,400 Z"
          fill="#12141a" />
        <path
          d="M0,400 L0,322 C60,300 140,330 220,308 C300,288 360,268 440,290 C520,310 580,300 640,280 C702,260 742,270 780,292 L780,400 Z"
          fill="#0a0b0f" />
        <g fill="#0a0b0f">
          <rect x="788" y="252" width="38" height="148" />
          <rect x="834" y="300" width="28" height="100" />
          <rect x="872" y="222" width="48" height="178" />
          <rect x="930" y="270" width="34" height="130" />
          <rect x="974" y="182" width="58" height="218" />
          <rect x="1042" y="262" width="30" height="138" />
          <rect x="1082" y="308" width="44" height="92" />
          <rect x="1136" y="240" width="34" height="160" />
          <rect x="1180" y="286" width="54" height="114" />
          <rect x="1244" y="252" width="30" height="148" />
          <rect x="1284" y="316" width="40" height="84" />
          <rect x="1334" y="266" width="48" height="134" />
          <rect x="1392" y="304" width="30" height="96" />
        </g>
      </svg>
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="/home" class="brand">
              <img class="brand-mark" src="/images/posh-passage-logo.png" alt="">
              <span class="brand-word">Posh Passage<span>LIMOUSINES</span></span>
            </a>
            <p>Chauffeured limousines and party buses across the Lower Mainland, the Fraser Valley and the Sea-to-Sky
              corridor — available around the clock.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/service">Services</a></li>
              <li><a href="/fleet">Our Fleet</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Book</h4>
            <ul>
              <li><a href="/book">Book a Ride</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="tel:+16723773932">(672) 377-3932</a></li>
              <li><a href="mailto:poshpassagelimosines@gmail.com">Email Us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Service Area</h4>
            <ul>
              <li>Metro Vancouver</li>
              <li>Fraser Valley &amp; Chilliwack</li>
              <li>Squamish &amp; Whistler</li>
              <li>USA Seattle Airport</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-year></span> Posh Passage Limousines. All rights reserved.</span>
          <span>1959 152 St, Surrey, BC</span>
        </div>
      </div>
    </footer>

  5:X
a:X
a:C
0:{"buildId":"PvJo2PPtm1YzornIn6Fga","data":[{"rsc":["$","$1","c",{"children":[["$","div",null,{"dangerouslySetInnerHTML":{"__html":"$2"}}],null,"$L3"]}],"isPartial":"$@4","staleTime":"$5","varyParams":null},{"rsc":"$L6","isPartial":"$@7","staleTime":"$5","varyParams":null},{"rsc":"$L8","isPartial":"$@9","staleTime":"$5","varyParams":"$a"},{"rsc":"$Lb","isPartial":"$@c","staleTime":"$5","varyParams":null}],"isUpgradeableISRFallback":false,"a":"$@d","rootVaryParams":null,"needsRuntimeRequest":"$@e"}
f:I[97367,["/_next/static/chunks/195vso9a1b13t.js"],"OutletBoundary"]
10:"$Sreact.suspense"
12:I[97367,["/_next/static/chunks/195vso9a1b13t.js"],"ViewportBoundary"]
13:I[97367,["/_next/static/chunks/195vso9a1b13t.js"],"MetadataBoundary"]
14:I[27201,["/_next/static/chunks/195vso9a1b13t.js"],"IconMark"]
15:I[39756,["/_next/static/chunks/195vso9a1b13t.js"],"default"]
16:I[37457,["/_next/static/chunks/195vso9a1b13t.js"],"default"]
17:I[49322,["/_next/static/chunks/195vso9a1b13t.js"],"default"]
18:I[79520,["/_next/static/chunks/195vso9a1b13t.js"],""]
:HL["/_next/static/chunks/0dv3-a5fsbcjj.css","style"]
3:["$","$Lf",null,{"children":["$","$10",null,{"name":"Next.MetadataOutlet","children":"$@11"}]}]
6:["$","$1","h",{"children":[null,["$","$L12",null,{"children":[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]}],["$","div",null,{"hidden":true,"children":["$","$L13",null,{"children":["$","$10",null,{"name":"Next.Metadata","children":[["$","title","0",{"children":"Book a Limousine or Party Bus in Surrey, BC | Posh Passage"}],["$","meta","1",{"name":"description","content":"Request your chauffeur-driven limousine or party bus in Surrey, Metro Vancouver, the Fraser Valley or Whistler. Get a ride quote from Posh Passage Limousines."}],["$","link","2",{"rel":"canonical","href":"https://www.poshpassagelimousine.ca/book"}],["$","meta","3",{"property":"og:title","content":"Book a Limousine or Party Bus in Surrey, BC | Posh Passage"}],["$","meta","4",{"property":"og:description","content":"Request your chauffeur-driven limousine or party bus in Surrey, Metro Vancouver, the Fraser Valley or Whistler. Get a ride quote from Posh Passage Limousines."}],["$","meta","5",{"property":"og:type","content":"website"}],["$","meta","6",{"name":"twitter:card","content":"summary"}],["$","meta","7",{"name":"twitter:title","content":"Book a Limousine or Party Bus in Surrey, BC | Posh Passage"}],["$","meta","8",{"name":"twitter:description","content":"Request your chauffeur-driven limousine or party bus in Surrey, Metro Vancouver, the Fraser Valley or Whistler. Get a ride quote from Posh Passage Limousines."}],["$","link","9",{"rel":"icon","href":"/images/posh-passage-logo.png"}],["$","$L14","10",{}]]}]}]}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}]
8:["$","$1","c",{"children":[null,["$","$L15",null,{"parallelRouterKey":"children","template":["$","$L16",null,{}]}]]}]
b:["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/0dv3-a5fsbcjj.css","precedence":"next"}],["$","script","script-0",{"src":"/_next/static/chunks/195vso9a1b13t.js","async":true}]],["$","html",null,{"lang":"en","className":"bodoni_moda_6aa76d5b-module__dfxwzW__variable inter_d283afda-module__nJeQYG__variable space_grotesk_30a8ae37-module__ItXxGW__variable","children":["$","body",null,{"children":[["$","$L15",null,{"parallelRouterKey":"children","template":["$","$L16",null,{}],"notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]]}],["$","$L17",null,{}],["$","$L18",null,{"src":"https://www.googletagmanager.com/gtag/js?id=G-2WJ29KXS71","strategy":"lazyOnload"}],["$","$L18",null,{"id":"google-analytics","strategy":"lazyOnload","children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', 'G-2WJ29KXS71');\n          "}]]}]}]]}]
11:null
e:true
5:300
5:C
d:0
7:"$undefined"
9:"$undefined"
c:"$undefined"
4:"$undefined"
