# MANIFEST FOTO — Parrucchiere «L'Uomo» di Sansone Pasquale
Agente 1-bis (cacciatore di foto) · 11/09/2026 · risoluzioni misurate sul file, non stimate.

## RIEPILOGO SECCO
| Voce | Numero |
|---|---|
| Immagini sorgente distinte trovate e scaricate | **19** (3 Google Maps + 12 post IG + 3 copertine storie in evidenza + 1 foto profilo) |
| File in `assets/raw/` | 35 (include i 12 post IG anche in versione 640px del predecessore, ora superati, e 4 ritagli logo) |
| File selezionati in `assets/site/` | **6** (4 varianti del logo + 2 foto) |
| Foto (non grafiche) usabili online subito | **2** |
| Verticali usabili | **1** (`vetrina-natale-01.jpg`) |
| Interno del negozio usabile | **0** (le 2 foto d'interno di Google non sono confermate come sue, vedi sotto) |
| Esterno / insegna | **0** insegna · 1 vetrina (natalizia, stagionale) |
| Titolare riconoscibile con certezza | **0** |
| **Logo** | **SÌ**: raster pulito, **377x410 px** (verticale) e **935x173 px** (orizzontale). Non esiste in vettoriale online. |

## FONTI ESAURITE
- **Google Maps «L' Uomo»**: la scheda ha **3 foto in totale**, scaricate alla risoluzione nativa massima (`=s0` restituisce gli stessi byte). Non c'è altro.
- **Instagram @hairdressing_sp**: senza login si vedono solo gli **ultimi 12 post** su 276. Tutti e 12 presi in **originale** (916–1522 px) tramite l'endpoint pubblico `/embed/`. Le API e lo scorrimento oltre il 12° post chiedono il login. **Per i caroselli si vede solo la prima slide**: le altre non si raggiungono. La foto profilo esce solo a 150 px (la firma dell'URL blocca le taglie più grandi).
- **Facebook**: nessuna pagina aziendale. Ci sono solo due profili personali «Pasquale Sansone», non verificati: non li ho toccati.
- **PagineGialle, PagineBianche, Virgilio, Parrucchiere24, ProntoImprese**: nessuna foto del negozio, solo scheda testuale.
- **Street View**: non scaricato. Le immagini sono di Google e non si possono usare sul sito.

## ⚠️ DUE AVVERTENZE PRIMA DI USARE QUALSIASI FOTO
1. **`gmaps-01` e `gmaps-03` probabilmente NON sono il suo negozio.** Mostrano un locale con divano Chesterfield, lavagna «Barber House», muro in mattoni e poltrone vintage. Il negozio che si vede sui suoi post (07, 10, 11) è invece **bianco, con mensole in vetro e il monogramma SP sugli specchi**. Sono foto caricate da utenti sulla scheda Google: possono essere sbagliate o vecchie. **Tenerle fuori finché Pasquale non conferma.**
2. **Quasi tutto il lavoro vero ritrae minori riconoscibili** (post 07, 09, 11). Senza la liberatoria firmata dai genitori non vanno online.

## TABELLA — `assets/site/` (SELEZIONATE)
| File | Cosa si vede | Or. | Px reali | Sezione del sito | Q 1-5 | Volti riconoscibili |
|---|---|---|---|---|---|---|
| `logo-luomo.png` | Monogramma SP + HAIRDRESSING + SANSONE PASQUALE, inchiostro grafite, fondo trasparente. Ritagliato dal post AVVISO del 10/09/2026 (1522 px) | V | 377x410 | Header su fondo chiaro, footer, favicon (solo il blocco SP) | 4 | NO |
| `logo-luomo-negativo.png` | Stesso logo, inchiostro osso chiaro su trasparente | V | 377x410 | Hero e footer su grafite | 4 | NO |
| `logo-luomo-orizzontale.png` | Lockup orizzontale SP + HAIRDRESSING / SANSONE PASQUALE, inchiostro grafite. Dalla locandina orari 2024 | O | 935x173 | Barra di navigazione su fondo chiaro | 4 | NO |
| `logo-luomo-orizzontale-negativo.png` | Stesso lockup, inchiostro chiaro | O | 935x173 | Barra di navigazione su grafite (**consigliato**) | 4 | NO |
| `taglio-sfumatura-01.jpg` | Taglio con sfumatura laterale e ciuffo lavorato, visto di tre quarti da dietro. Occhiali, volto non visibile. Filtro Instagram rosato, anni '10 | O | 1440x1165 | Galleria lavori (con correzione colore: togliere la dominante rosa) | 3 | NO (solo guancia e orecchio) |
| `vetrina-natale-01.jpg` | Vetrina del negozio a Natale: poster b/n con logo SP, pannello a monogrammi, panchetta d'epoca, sfere oro. È la metà destra del collage (post 07/12/2025) | V | 712x1440 | Fascia «Il negozio» o chiusura della galleria. **Stagionale**: va sostituita | 3 | NO (il poster è una grafica) |

> I 4 PNG del logo sono **ritagli fedeli**, non ridisegnati. I bordi vengono da un JPEG: sotto i 200 px vanno bene, sopra si vede la morbidezza. **Serve il file originale (vettoriale) dal cliente**: vedi SHOT-LIST §0.

## TABELLA — `assets/raw/` (SCARTATE O IN ATTESA)
| File | Cosa si vede | Or. | Px reali | Uso possibile | Q 1-5 | Volti riconoscibili | Perché fuori |
|---|---|---|---|---|---|---|---|
| `ighi-07-DK4QIlrIpH5.jpg` | Ragazzino di profilo, sfumatura con due righe incise, ciuffo schiarito. Sullo sfondo lo specchio con logo SP e le mensole in vetro: **è il suo negozio** | O | 1440x1079 | Galleria: **la foto di lavoro migliore** | 4 | **SÌ — minore** | **Serve la liberatoria dei genitori.** Firmata quella, entra come `taglio-righe-01.jpg` |
| `ighi-09-DJWzyslI_qy.jpg` | Bambino di profilo su muro spatolato azzurro-grigio, sfumatura con righe incise | O | 1440x1200 | Galleria bambini | 3 | **SÌ — minore** | Liberatoria genitori |
| `ighi-11-DJEvCDUIkLf.jpg` | Ragazzino, sfumatura alta con ciuffo schiarito, riflesso allo specchio. Lavatesta e interno bianco | O | 1364x1022 | Galleria | 3 | **SÌ — minore** (due volte, con il riflesso) | Liberatoria genitori, e il riflesso duplica il volto |
| `ighi-05-DL4eDO7o7pv.jpg` | Uomo in giacca e occhiali da sole, taglio slick back con sfumatura bassa e barba curata. Muro chiaro, esterno | V | 1151x1439 | Galleria o hero: la più «maschile» del lotto | 4 | **SÌ** | Chi è? Cliente o titolare: **da chiedere**. Con la liberatoria diventa la miglior verticale disponibile |
| `ighi-08-DKMTO19ImPv-reel.jpg` | Selfie allo specchio di un ragazzo con «Modern Mullet», scritta sovraimpressa, girato **in casa** | Q | 720x720 | — | 2 | SÍ | Sotto gli 800 px, testo sovraimpresso, telefono in mano, non è il negozio |
| `gmaps-01.jpg` | Sala d'attesa con divano Chesterfield, lavagna «Barber House», graffito di un uomo con gli occhiali, targhe alle pareti | O | 1600x1200 | — | 3 | NO | **Probabilmente non è il suo negozio** (vedi avvertenza 1) |
| `gmaps-03.jpg` | Interno b/n: poltrone vintage, muro in mattoni, arco, lampade industriali | O | 1080x713 | — | 4 | NO | **Probabilmente non è il suo negozio** (vedi avvertenza 1) |
| `gmaps-02.jpg` | Barbiere tatuato (braccio con palo del barbiere) che taglia a un cliente barbuto | O | 768x432 | — | 3 | **SÌ, due persone** | Sotto gli 800 px. Non si sa se il barbiere sia Pasquale |
| `ighi-01-DdG_e37MzOl.jpg` | Locandina AVVISO: orario continuo del sabato, dal 12/09 al 28/11/2026 | V | 1522x1906 | Fonte del logo · riferimento tipografico | — | NO | Grafica, non foto |
| `ighi-02-DZ92IIxjGZS.jpg` | Locandina ferie estive con logo ABA (Associazione Barbieri Angri) | V | 916x1221 | Riferimento: **è socio ABA** (possibile badge di fiducia, da chiedere) | — | NO | Grafica |
| `ighi-03-DSABcyqjHLr.jpg` | Tabella chiusure 2025/2026, testata grafite con logo in negativo | V | 1440x1901 | Riferimento stile | — | NO | Grafica |
| `ighi-06-DLSG1WGoZS8.jpg` | Locandina ferie estive con palme | V | 1440x1920 | Seconda fonte del logo | — | NO | Grafica |
| `ighi-12-DDrrfDwIpVD.jpg` | Tabella chiusure 2024/2025, testata nera | V | 1440x1749 | Fonte del logo orizzontale | — | NO | Grafica |
| `ighi-04-DR-YZ4ojPTc.jpg` | Collage di due scatti della vetrina natalizia (originale intero) | Q | 1440x1440 | Sorgente di `vetrina-natale-01` | 3 | NO | La metà sinistra è bruciata da un riflesso |
| `ig-post-01…12-*.jpg` | Gli stessi 12 post a 640 px (download del predecessore) | — | 480–640 | — | — | — | **Superati** dai file `ighi-*` in originale |
| `ig-highlight-1/2/3.jpg` | Copertine delle storie in evidenza (ORARI NATALIZI, Orario estivo, INFO) | Q | 150x150 | — | 1 | NO | Miniature |
| `ig-profilepic.jpg` | Foto profilo = logo SP | Q | 150x150 | — | 2 | NO | Miniatura. Il logo viene dai ritagli |
| `logo-crop-*.png` (4) | Ritagli di lavoro del logo | — | — | — | — | NO | Copiati in `site/` con nomi definitivi |

## COSA NON SONO RIUSCITO A PRENDERE
- I **264 post più vecchi** di Instagram: senza login non si vedono.
- Le **slide 2 e seguenti dei caroselli** (post 02, 07, 09, 10, 11).
- I **video dei reel** (preso solo il fotogramma di copertina del reel del 28/05/2025).
- Il **contenuto delle storie in evidenza** (solo le copertine a 150 px).
- **Nessuna foto dell'esterno con l'insegna** esiste online, su nessuna fonte.
- **Nessuna foto certa del titolare.**
