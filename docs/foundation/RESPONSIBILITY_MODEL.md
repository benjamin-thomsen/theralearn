# TheraLearn – Implementation Responsibility Model v1.0

> Version: 1.0
>
> Status: Authoritative Foundation ownership unit
>
> Transfer rule: Transfer – do not re-derive

---

## Methodological contract

Every responsibility uses the locked contract:

- Formål
- Ansvar
- Autoritet
- Input
- Output
- Tilladte afhængigheder
- Forbudte afhængigheder
- Bevarede arkitektoniske egenskaber
- Verificerbare grænser
- Certificeringskriterier

The six responsibilities are methodological responsibility categories, not components, technical layers, folders, services, classes, or interfaces.

---

# 1. Fortolkningsansvar

## Formål

At omsætte certificeret arkitektonisk betydning til entydige implementeringsbetingelser uden at ændre betydningen.

## Ansvar

-  Identificere hvilken certificeret regel der gælder. 
-  Udlede hvilke handlinger reglen tillader. 
-  Udlede hvilke handlinger reglen forbyder. 
-  Levere en entydig fortolkning til de ansvar, der skal handle. 

## Autoritet

Må:

-  fortolke allerede certificerede regler, 
-  vælge mellem eksplicit tilladte arkitektoniske udfald, 
-  afvise en handling, der ikke kan begrundes arkitektonisk. 

Må ikke:

-  opfinde nye regler, 
-  ændre en certificeret regel, 
-  udvide regelens anvendelsesområde, 
-  tilsidesætte tvetydighed gennem teknisk pragmatisme. 

## Input

-  Certificerede Foundation-principper. 
-  Certificerede arkitektoniske regler. 
-  Implementation Architecture. 
-  Den konkrete ønskede handling eller situation. 

## Output

-  En entydig implementeringsbetingelse. 
-  Et tilladt udfald. 
-  Et forbudt udfald. 
-  Eller en eksplicit afvisning på grund af manglende arkitektonisk grundlag. 

## Tilladte afhængigheder

-  Foundation. 
-  Architecture. 
-  Implementation Architecture. 
-  Certificerede regler og beslutninger. 

## Forbudte afhængigheder

-  Teknologispecifik bekvemmelighed. 
-  Eksisterende kodeadfærd som selvstændig autoritet. 
-  UI-struktur. 
-  Datalagringsformat. 
-  Tilfældige implementeringskonventioner. 

## Bevarede arkitektoniske egenskaber

-  Implementeringen redefinerer ikke arkitekturen. 
-  Alle handlinger er sporbare. 
-  Ingen implicitte regler introduceres. 
-  Arkitekturen forbliver autoritativ. 

## Verificerbare grænser

Det skal kunne verificeres, at:

-  hver fortolkning henviser til en overliggende regel, 
-  ingen ny regel skjules i fortolkningen, 
-  samme arkitektoniske situation giver samme metodiske udfald, 
-  tvetydighed ikke skjules. 

## Certificeringskriterier

Fortolkningsansvaret er certificerbart, når:

1.  Alle fortolkninger kan spores opad. 
2.  Ingen fortolkning udvider arkitekturen. 
3.  Afvisning er mulig ved manglende grundlag. 
4.  Teknisk bekvemmelighed ikke fungerer som autoritet. 
5.  Fortolkning og handling er metodisk adskilt. 

---

# 2. Autoritetsansvar

## Formål

At sikre, at kun det ansvar, der arkitektonisk ejer en beslutning, kan træffe eller godkende den.

## Ansvar

-  Identificere beslutningens autoritative ejer. 
-  Kontrollere at anmoderen har den nødvendige autoritet. 
-  Delegere handling uden at delegere mere autoritet end nødvendigt. 
-  Afvise autoritetsoverskridelse. 
-  Beskytte mod parallelle beslutningscentre. 

## Autoritet

Må:

-  godkende eller afvise handling inden for sit delegerede område, 
-  kræve arkitektonisk begrundelse, 
-  standse handlinger, der overskrider ansvar. 

Må ikke:

-  overtage en anden autoritets beslutning, 
-  delegere arkitekturejerskab til implementeringen, 
-  gøre teknisk adgang til beslutningsautoritet, 
-  skabe lokal undtagelsesautoritet uden overliggende grundlag. 

## Input

-  Fortolket arkitektonisk betingelse. 
-  Anmodet handling. 
-  Handlingens kontekst. 
-  Kendte ejerskabs- og autoritetsgrænser. 

## Output

-  Autoriseret handling. 
-  Afvist handling. 
-  Eskalering til rette autoritet. 
-  Dokumenterbar autoritetsbegrundelse. 

## Tilladte afhængigheder

-  Fortolkningsansvar. 
-  Certificeret ansvarsejerskab. 
-  Arkitektoniske grænser. 
-  Gyldig tilstand og kontekst. 

## Forbudte afhængigheder

-  Kaldende komponents tekniske placering. 
-  Brugergrænsefladens struktur. 
-  Midlertidige implementeringsgenveje. 
-  Historisk adfærd uden certificeret grundlag. 

## Bevarede arkitektoniske egenskaber

-  Én autoritativ ejer. 
-  Ingen skjulte beslutningscentre. 
-  Ingen ansvarsoverlap. 
-  Ingen omgåelse af arkitekturen. 

## Verificerbare grænser

Det skal kunne verificeres:

-  hvem der ejer hver beslutning, 
-  hvem der må anmode, 
-  hvem der må godkende, 
-  hvem der må udføre, 
-  og hvem der ikke må gøre nogen af delene. 

## Certificeringskriterier

Autoritetsansvaret er certificerbart, når:

1.  Hver beslutning har én identificerbar autoritet. 
2.  Autorisation og eksekvering kan adskilles. 
3.  Autoritetsoverskridelse medfører afvisning. 
4.  Ingen teknisk struktur skaber implicit autoritet. 
5.  Parallelle beslutningskilder er metodisk umulige. 

---

# 3. Tilstandsansvar (State Responsibility)

## Formål

Tilstandsansvaret skal sikre, at enhver information altid befinder sig i én entydig, verificerbar tilstand.

Tilstanden må aldrig være implicit.

Den skal kunne udledes objektivt.

## Ansvar

Tilstandsansvaret har ansvaret for:

- at definere den aktuelle tilstand
- at sikre entydige tilstande
- at sikre lovlige tilstandsovergange
- at forhindre ulovlige tilstande
- at gøre tilstanden verificerbar

Det ejer ikke betydningen af informationen.

Det ejer ikke autoriteten til at beslutte.

Det ejer udelukkende informationens livscyklustilstand.

## Autoritet

Tilstandsansvaret har autoritet over:

- den aktuelle tilstand
- registreringen af tilstanden
- validering af tilstandsovergange

Det har ikke autoritet over:

- fortolkning
- placering
- eksekvering
- implementering

## Input

Tilstandsansvaret modtager:

- en eksisterende tilstand
- en ønsket overgang
- verificerede beslutninger
- regler for lovlige overgange

Det producerer ikke selv nye beslutninger.

## Output

Tilstandsansvaret producerer:

- en ny verificeret tilstand
- eller en afvist overgang

Intet tredje udfald eksisterer.

## Tilladte afhængigheder

Tilstandsansvaret må afhænge af:

- Fortolkningsansvaret
- Autoritetsansvaret
- Information Lifecycle

Disse bestemmer henholdsvis betydning, beslutningsret og de tilladte livscyklusregler.

## Forbudte afhængigheder

Tilstandsansvaret må ikke afhænge af:

- implementeringsdetaljer
- filsystem
- runtime
- værktøjer
- brugergrænseflade
- kodeorganisation

Tilstand er en arkitektonisk egenskab, ikke en teknisk implementeringsdetalje.

## Bevarede arkitektoniske egenskaber

Denne afgrænsning bevarer:

- entydige tilstande
- deterministiske overgange
- reproducerbarhed
- verificerbarhed
- uafhængighed af implementering
- adskillelse mellem betydning, beslutning og tilstand

Dermed fastholdes den lagdelte arkitektur og princippet om, at ansvar ikke overlapper.

## Verificerbare grænser

Tilstandsansvaret er korrekt afgrænset, hvis:

- enhver information har præcis én aktuel tilstand
- enhver overgang kan verificeres
- ulovlige overgange afvises
- ingen anden ansvarskategori ændrer tilstanden direkte
- tilstanden kan udledes uafhængigt af implementeringen

## Certificeringskriterier

Tilstandsansvaret kan certificeres, når følgende kan påvises:

- Tilstand er entydigt defineret.
- Ansvarsområdet overlapper ikke Fortolkningsansvaret eller Autoritetsansvaret.
- Alle lovlige tilstandsovergange er verificerbare.
- Ingen implementeringsdetaljer indgår i ansvarsdefinitionen.
- Tilstandsansvaret kan udledes direkte af Foundation v1.0 og den låste Information Lifecycle uden at introducere nye fundamentale begreber.

# 4. Placeringsansvar

## Formål

Placeringsansvarets formål er at sikre, at enhver information, tilstand, beslutning, handling og verificerbar sandhed befinder sig på det arkitektonisk korrekte sted.

Placeringsansvaret beskytter princippet om, at:

> Information har ét autoritativt hjem, og ansvar placeres dér, hvor den nødvendige betydning og autoritet allerede findes.

Placeringsansvaret afgør ikke, hvad information betyder, om den er autoritativ, eller hvordan den skal eksekveres.

Det afgør:

> Hvor må den eksistere, ejes, ændres og gøres tilgængelig?

---

## Ansvar

Placeringsansvaret skal:

-  placere information i dens autoritative hjem 
-  placere ansvar i det korrekte arkitektoniske lag 
-  forhindre parallelle ejerskaber 
-  forhindre skjulte kopier af autoritativ information 
-  sikre, at afledt information kan spores til sit autoritative grundlag 
-  sikre, at midlertidig information ikke bliver permanent ved et uheld 
-  skelne mellem opbevaring, adgang, visning og ejerskab 
-  sikre, at runtime- og tooling-information ikke blandes 
-  sikre, at projektets stabile og aktuelle information holdes adskilt 
-  sikre, at information flyttes gennem livscyklussen uden at blive duplikeret 

Placeringsansvaret ejer derfor ikke informationens betydning.

Det ejer reglerne for dens arkitektoniske placering.

---

## Autoritet

Placeringsansvaret har autoritet til at:

-  afgøre hvilket lag der må eje en given information 
-  afgøre hvilket system eller dokument der er autoritativt hjem 
-  afvise placeringer, der skaber dobbelt ejerskab 
-  kræve, at kopier erstattes af referencer eller afledninger 
-  skelne mellem permanent, midlertidig og afledt placering 
-  forhindre, at præsentationslag bliver autoritative datakilder 
-  forhindre, at tooling overtager runtime-ejerskab 
-  forhindre, at arbejdssessioner bliver permanent projektlager 
-  kræve flytning, når information skifter livscyklustilstand 

Placeringsansvaret har ikke autoritet til at:

-  ændre informationens betydning 
-  erklære information sand eller verificeret 
-  træffe domænebeslutninger 
-  udføre handlinger 
-  godkende tilstandsovergange 
-  ændre autoritetsregler 
-  skabe nye arkitektoniske lag uden særskilt udledning 

---

## Input

Placeringsansvaret modtager:

-  fortolket information 
-  informationens identificerede type 
-  informationens aktuelle livscyklustilstand 
-  informationens autoritetsstatus 
-  den relevante lagdelte arkitektur 
-  gældende Information Placement-regler 
-  gældende State Transition-regler 
-  kendte ejerskabsrelationer 
-  kendte afhængigheder 
-  krav til persistens og levetid 
-  krav til adgang, visning og anvendelse 

Inputtet skal være tilstrækkeligt fortolket til, at placering kan vurderes uden at genfortolke domænets betydning.

---

## Output

Placeringsansvaret producerer:

-  en entydig autoritativ placering 
-  et identificeret ejende lag eller komponentansvar 
-  en klassifikation som permanent, midlertidig eller afledt placering 
-  tilladte adgangsveje 
-  tilladte reference- eller afledningsrelationer 
-  afvisning af ulovlige parallelle placeringer 
-  krav om flytning ved livscyklusændring 
-  identificerede placeringsbrud 
-  en verificerbar placeringskontrakt 

Outputtet må ikke være en ny fortolkning eller en ny domænebeslutning.

Det skal være en placeringsafgørelse baseret på allerede udledte regler.

---

## Tilladte afhængigheder

Placeringsansvaret må afhænge af:

-  Fortolkningsansvar for informationens identificerede betydning 
-  Autoritetsansvar for informationens gyldige ejer og beslutningsmyndighed 
-  Tilstandsansvar for informationens aktuelle livscyklustilstand 
-  den låste lagdelte arkitektur 
-  certificerede Information Placement-regler 
-  certificerede State Transition-regler 
-  kendte persistens- og adgangskrav 
-  eksplicitte ejerskabskontrakter 
-  eksplicitte afhængighedsgrænser 

Afhængighederne må kun bruges til at afgøre placering.

De må ikke bruges til at overtage de andre ansvars autoritet.

---

## Forbudte afhængigheder

Placeringsansvaret må ikke afhænge af:

-  præsentationsmæssig bekvemmelighed 
-  tilfældig eksisterende filstruktur 
-  hvilken komponent der først modtager informationen 
-  hvilken komponent der lettest kan gemme informationen 
-  implicitte globale tilstande 
-  skjulte caches som autoritativ kilde 
-  duplikerede konfigurationer 
-  arbejdssessionens hukommelse 
-  tooling-output som permanent runtime-sandhed 
-  eksekveringsmekanismer som begrundelse for ejerskab 
-  verifikationsresultater som erstatning for autoritativ placering 
-  historiske implementeringsvalg uden arkitektonisk hjemmel 

En information må ikke placeres et sted alene, fordi det er teknisk muligt.

---

## Bevarede arkitektoniske egenskaber

Placeringsansvaret skal bevare:

### Single Source of Truth

Enhver autoritativ information har ét permanent hjem.

### Information flyttes – den kopieres ikke

Ved livscyklusændring ændres informationens autoritative placering eller status uden at efterlade konkurrerende kopier.

### Lagdelt ansvar

Information placeres i det lag, der ejer dens betydning og autoritet.

### Betydningsbevarelse

Flytning eller eksponering må ikke ændre informationens betydning.

### Autoritetsbevarelse

Adgang til information giver ikke automatisk ret til at ændre den.

### Sporbarhed

Afledt information skal kunne spores til sit autoritative grundlag.

### Runtime–Tooling-adskillelse

Tooling må observere, kontrollere og rapportere runtime, men må ikke blive skjult ejer af runtime-sandhed.

### Stabil–Aktuel-adskillelse

Stabil projektidentitet og aktuel projektstatus må ikke få samme autoritative hjem.

---

## Verificerbare grænser

Placeringsansvaret er korrekt afgrænset, hvis:

-  enhver permanent information har præcis ét autoritativt hjem 
-  midlertidig information ikke behandles som permanent sandhed 
-  kopier ikke kan udvikle selvstændig autoritet 
-  afledt information er sporbar 
-  præsentationslag ikke ejer domænesandhed 
-  tooling ikke ejer runtime-sandhed 
-  stabile og aktuelle projektinformationer holdes adskilt 
-  ændring af placering følger Information Lifecycle 
-  placering ikke bruges til at omgå autoritetsgrænser 

---

## Certificeringskriterier

Placeringsansvaret kan certificeres, når:

1. Hver informationstype har ét identificeret autoritativt hjem.
2. Ingen ansvarstype har konkurrerende ejere.
3. Midlertidig, permanent og afledt placering kan skelnes entydigt.
4. Alle placeringsbeslutninger kan spores til arkitektoniske regler.
5. Information Placement kan håndhæves uden at genfortolke informationens betydning.
6. State Transition kan ændre placering uden at skabe duplikation.
7. Runtime og Tooling har adskilte informationsdomæner.
8. Den lagdelte arkitektur bevares.
9. Flytning og reference kan verificeres uden skjulte kopier.
10. Placeringsansvaret kan udledes direkte af det certificerede fundament uden nye meta-principper.

# 5. Eksekveringsansvar

## Formål

At udføre en konkret implementeringshandling i overensstemmelse med de allerede fastlagte beslutninger uden selv at ændre deres betydning, autoritet, tilstand eller placering.

---

## Ansvar

Eksekveringsansvaret har ansvar for:

-  at udføre en tilladt handling 
-  at følge den autoriserede implementeringsplan 
-  at anvende de givne input korrekt 
-  at producere det forventede resultat 
-  at stoppe ved manglende forudsætninger eller fejl 

Eksekveringsansvaret beslutter ikke *hvad* der skal gøres, men *udfører* det, der allerede er besluttet.

---

## Autoritet

Eksekveringsansvaret har autoritet til:

-  at udføre handlinger inden for sit eget ansvarsområde 
-  at anvende de autoriserede input 
-  at generere de definerede output 
-  at afbryde eksekveringen ved brud på forudsætninger 

Eksekveringsansvaret har **ikke** autoritet til:

-  at ændre betydningen af information 
-  at ændre autoritetsforhold 
-  at ændre informationsplacering 
-  at ændre arkitektur 
-  at etablere nye afhængigheder 
-  at definere nye workflows 

---

## Input

Eksekveringsansvaret modtager udelukkende:

-  autoriserede instruktioner 
-  verificerede inputdata 
-  kendte tilstande 
-  kendte placeringer 
-  nødvendige afhængigheder 

---

## Output

Eksekveringsansvaret producerer:

-  den udførte handling 
-  de forventede ændringer 
-  opdaterede resultater 
-  information om succes eller fejl 

Output skal være direkte afledt af input og må ikke indeholde nye fortolkninger eller beslutninger.

---

## Tilladte afhængigheder

Eksekveringsansvaret må afhænge af:

-  Fortolkningsansvaret 
-  Autoritetsansvaret 
-  Tilstandsansvaret 
-  Placeringsansvaret 

Disse leverer de nødvendige rammer, som eksekveringen skal følge.

---

## Forbudte afhængigheder

Eksekveringsansvaret må ikke afhænge af:

-  fremtidige resultater 
-  egne tidligere eksekveringer som autoritativ sandhed 
-  skjult global tilstand 
-  implicitte sideeffekter 
-  uverificerede antagelser 

---

## Bevarede arkitektoniske egenskaber

Eksekveringsansvaret bevarer:

-  ansvarsadskillelse 
-  deterministisk udførelse 
-  reproducerbarhed 
-  Workflow First Principle 
-  Single Source of Truth 
-  den lagdelte arkitektur 
-  Information Lifecycle 
-  Information Placement 
-  State Transition 

---

## Verificerbare grænser

Det skal kunne verificeres, at Eksekveringsansvaret:

-  kun udfører autoriserede handlinger 
-  ikke ændrer betydning 
-  ikke ændrer autoritet 
-  ikke ændrer placering 
-  ikke etablerer nye afhængigheder 
-  ikke foretager arkitektoniske beslutninger 

---

## Certificeringskriterier

Eksekveringsansvaret er korrekt udledt når:

-  det alene udfører allerede autoriserede handlinger 
-  alle beslutninger stammer fra tidligere ansvar 
-  udførelsen er reproducerbar 
-  ansvarsgrænserne kan verificeres 
-  ingen andre ansvar overtages under eksekveringen 

# 6. Verifikationsansvar

## Formål

At afgøre om resultatet af en udført handling er i overensstemmelse med de allerede autoriserede krav, regler og arkitektoniske grænser uden selv at ændre disse.

---

## Ansvar

Verifikationsansvaret har ansvar for:

-  at kontrollere udførte resultater 
-  at sammenligne resultatet med de autoriserede krav 
-  at identificere afvigelser 
-  at afgøre om kravene er opfyldt 
-  at rapportere verifikationsresultatet 

Verifikationsansvaret beslutter ikke, hvordan et resultat skal rettes. Det afgør alene, om resultatet opfylder de eksisterende kriterier.

---

## Autoritet

Verifikationsansvaret har autoritet til:

-  at inspicere input og output 
-  at anvende de autoriserede verifikationskriterier 
-  at erklære et resultat verificeret eller ikke verificeret 
-  at dokumentere konstaterede afvigelser 

Verifikationsansvaret har **ikke** autoritet til:

-  at ændre implementeringen 
-  at ændre betydningen af information 
-  at ændre autoritetsforhold 
-  at ændre tilstande 
-  at ændre informationsplacering 
-  at ændre certificeringskriterierne under selve verifikationen 

---

## Input

Verifikationsansvaret modtager udelukkende:

-  resultatet af den udførte eksekvering 
-  de autoriserede krav 
-  de autoriserede regler 
-  de fastlagte certificeringskriterier 
-  nødvendige verificerbare fakta 

---

## Output

Verifikationsansvaret producerer:

-  et verifikationsresultat 
-  dokumenterede afvigelser 
-  dokumenteret overensstemmelse eller manglende overensstemmelse 
-  grundlaget for en eventuel certificering 

Output må ikke indeholde nye arkitektoniske beslutninger eller nye krav.

---

## Tilladte afhængigheder

Verifikationsansvaret må afhænge af:

-  Fortolkningsansvaret 
-  Autoritetsansvaret 
-  Tilstandsansvaret 
-  Placeringsansvaret 
-  Eksekveringsansvaret 

Disse leverer det grundlag, som verifikationen vurderer imod.

---

## Forbudte afhængigheder

Verifikationsansvaret må ikke afhænge af:

-  subjektive vurderinger uden autoriseret grundlag 
-  uverificerede antagelser 
-  skjulte sideeffekter 
-  egne tidligere konklusioner som autoritativ sandhed 
-  efterrationalisering af krav 

---

## Bevarede arkitektoniske egenskaber

Verifikationsansvaret bevarer:

-  objektiv verificerbarhed 
-  reproducerbarhed 
-  sporbarhed 
-  ansvarsadskillelse 
-  Workflow First Principle 
-  Single Source of Truth 
-  den lagdelte arkitektur 
-  Information Lifecycle 
-  Information Placement 
-  State Transition 

---

## Verificerbare grænser

Det skal kunne verificeres, at Verifikationsansvaret:

-  alene vurderer eksisterende resultater 
-  ikke ændrer implementeringen 
-  ikke ændrer kravene 
-  ikke ændrer betydning 
-  ikke ændrer autoritet 
-  ikke ændrer placering 
-  ikke ændrer arkitekturen 

---

## Certificeringskriterier

Verifikationsansvaret er korrekt udledt når:

-  alle vurderinger sker mod autoriserede kriterier 
-  resultatet kan reproduceres af en uafhængig verifikation 
-  ansvarsgrænsen mellem verifikation og implementering er entydig 
-  verifikationen alene konstaterer overensstemmelse eller afvigelse 
-  ingen øvrige ansvar overtages under verifikationen 

---

# Horizontal Analysis

## Formål

Den horisontale analyse tester grænserne mellem de seks ansvar på tværs af modellen.

Den undersøger:

- om to ansvar overlapper,
- om ét ansvar overtager et andet ansvars autoritet,
- om afhængigheder bliver cirkulære,
- om et ansvar kræver information, som et senere ansvar først producerer,
- om et ansvar kan fungere uden at kende et andet ansvars interne implementering,
- om ansvarene tilsammen bevarer de certificerede arkitektoniske egenskaber.

Analysen skal ikke forbedre modellen.
Den skal forsøge at modbevise den.

## Analyseregel

For hver relation undersøges:

1. Hvad ejer ansvar A?
2. Hvad ejer ansvar B?
3. Hvilket output må A levere til B?
4. Må B bruge dette output uden at overtage A's autoritet?
5. Kan A fungere uden at kende B's interne implementering?
6. Opstår der en cirkel, hvis B senere påvirker A?
7. Bevares de låste arkitektoniske principper?

Den horisontale hovedregel er:

> Hvert ansvar må anvende et foregående ansvars autoriserede output, men må aldrig overtage, omfortolke eller udvide det foregående ansvars beslutningsautoritet.

---

## 1. Fortolkningsansvar ↔ Autoritetsansvar

Fortolkningsansvaret fastlægger, hvad en certificeret regel betyder i den konkrete situation.

Autoritetsansvaret afgør, om en handling er legitim, og hvem der har ret til at godkende den.

Det centrale skel er:

Fortolkning:
Hvad betyder reglen?

Autoritet:
Hvem må handle på den?

Fortolkningsansvaret må ikke udlede autoritet alene ud fra betydningen.
Autoritetsansvaret må ikke ændre fortolkningen for at legitimere en ønsket handling.

Afhængigheden er ensrettet:

Fortolkning → Autoritet

Resultat: Bestået.

---

## 2. Autoritetsansvar ↔ Tilstandsansvar

Autoritetsansvaret afgør, om en ændring er legitim.

Tilstandsansvaret afgør, hvordan en legitim ændring påvirker den aktuelle tilstand.

Det centrale skel er:

Autoritet:
Må denne ændring ske?

Tilstand:
Hvilken tilstand følger, hvis ændringen sker?

Tilstandsansvaret må ikke selv legitimere ændringen.
Autoritetsansvaret må ikke selv gennemføre tilstandsovergange.

Tilstandsansvaret accepterer autoriserede transitioner og udleder ikke selv autoriteten ud fra informationens indhold.

Afhængigheden er ensrettet:

Autoritet → Tilstand

Resultat: Bestået.

---

## 3. Tilstandsansvar ↔ Placeringsansvar

Tilstandsansvaret fastlægger informationens gyldige livscyklustilstand.

Placeringsansvaret fastlægger informationens permanente hjem ud fra dens autoriserede tilstand og informationsrolle.

Det centrale skel er:

Tilstand:
Hvad er informationens aktuelle status?

Placering:
Hvor hører information med denne status permanent hjemme?

Tilstandsansvaret må ikke vælge dokument, fil eller lagerplacering.
Placeringsansvaret må ikke ændre informationens tilstand for at få den til at passe til en placering.

Placering er afhængig af gyldig tilstand, men tilstanden er ikke afhængig af den konkrete placering.

Afhængigheden er ensrettet:

Tilstand → Placering

Resultat: Bestået.

---

## 4. Placeringsansvar ↔ Eksekveringsansvar

Placeringsansvaret fastlægger den autoritative destination.

Eksekveringsansvaret udfører den allerede besluttede handling.

Det centrale skel er:

Placering:
Hvor skal informationen hen?

Eksekvering:
Hvordan gennemføres flytningen eller ændringen?

Eksekveringsansvaret må ikke selv vælge en anden placering ud fra bekvemmelighed, tekniske begrænsninger eller eksisterende filstruktur.

Placeringsansvaret må ikke definere den tekniske udførelse.

Afhængigheden er ensrettet:

Placering → Eksekvering

Resultat: Bestået.

---

## 5. Eksekveringsansvar ↔ Verifikationsansvar

Eksekveringsansvaret gennemfører handlingen.

Verifikationsansvaret afgør, om resultatet stemmer overens med den autoriserede forventning.

Det centrale skel er:

Eksekvering:
Hvad blev faktisk gjort?

Verifikation:
Stemmer det faktiske resultat med det forventede?

Eksekveringsansvaret må ikke erklære sin egen udførelse korrekt.
Verifikationsansvaret må ikke reparere eller ændre resultatet under kontrollen.

Verifikationsansvaret må afhænge af dokumenteret eksekveringsoutput, men ikke af eksekveringens interne selvvurdering.

Afhængigheden er ensrettet:

Eksekvering → Verifikation

Resultat: Bestået.

---

## 6. Fortolkningsansvar ↔ Tilstandsansvar

Fortolkningsansvaret afgør betydningen af informationen.
Tilstandsansvaret afgør dens aktuelle gyldige status.

Betydning og status må ikke sammenblandes.

Fortolkningen kan identificere, at informationen beskriver en beslutning, et spørgsmål eller et historisk forhold.
Den kan ikke selv erklære, at informationen er aktiv, verificeret eller arkiveret.

Resultat: Bestået.

---

## 7. Fortolkningsansvar ↔ Placeringsansvar

Fortolkningsansvaret identificerer informationsrollen.
Placeringsansvaret bruger den rolle til at vælge det autoritative hjem.

Placeringsansvaret må ikke udlede betydningen af filnavn, mappeplacering eller teknisk format.

Fortolkningsansvaret må ikke vælge permanent hjem.

Resultat: Bestået.

---

## 8. Fortolkningsansvar ↔ Eksekveringsansvar

Eksekveringsansvaret må kun modtage en allerede fastlagt implementeringsbetingelse.

Det må ikke under udførelsen ændre fortolkningen for at tilpasse den til tekniske begrænsninger.

Fortolkning må heller ikke specificere unødvendige tekniske detaljer og derved overtage eksekveringens mekanismevalg.

Resultat: Bestået.

---

## 9. Fortolkningsansvar ↔ Verifikationsansvar

Verifikationsansvaret skal kunne kontrollere, om det realiserede resultat svarer til den oprindelige fortolkning.

Det må ikke genfortolke reglen efter at resultatet er kendt.

Ellers kunne målet flyttes efter udførelsen.

Resultat: Bestået.

---

## 10. Autoritetsansvar ↔ Placeringsansvar

Autoritetsansvaret fastlægger, hvem der må træffe beslutningen.
Placeringsansvaret fastlægger, hvor den autoritative beslutning skal leve.

Det er ikke nødvendigvis samme komponent eller dokument, som både godkender og opbevarer beslutningen.

Placering må ikke skabe autoritet.
Autoritet må ikke udlede placering af teknisk adgang.

Resultat: Bestået.

---

## 11. Autoritetsansvar ↔ Eksekveringsansvar

En autoriseret handling kan udføres af en mekanisme, som ikke selv ejer beslutningen.

Dette er et centralt arkitektonisk skel.

Den instans, som har teknisk adgang til at ændre noget, har ikke nødvendigvis ret til at beslutte ændringen.

Eksekveringsansvaret skal kunne bevise sit mandat.

Resultat: Bestået.

---

## 12. Autoritetsansvar ↔ Verifikationsansvar

Verifikationsansvaret kontrollerer også, om den udførte handling lå inden for den autoriserede ramme.

Det må ikke selv efterfølgende udvide autorisationen for at acceptere et ellers ugyldigt resultat.

Autoritetsbeslutningen skal være stabil under verifikationen.

Resultat: Bestået.

---

## 13. Tilstandsansvar ↔ Eksekveringsansvar

Tilstandsansvaret fastlægger den lovlige transition.
Eksekveringsansvaret realiserer den.

Eksekveringen må ikke vælge en alternativ overgang, selv hvis den teknisk er lettere.

Tilstandsansvaret må ikke være afhængigt af eksekveringens interne struktur.

Resultat: Bestået.

---

## 14. Tilstandsansvar ↔ Verifikationsansvar

Verifikationsansvaret kontrollerer, om den forventede sluttilstand faktisk er opnået.

Tilstandsansvaret må ikke selv erklære sin forventning realiseret.

Verifikationen sammenholder den forventede og den observerede tilstand.

Resultat: Bestået.

---

## 15. Placeringsansvar ↔ Verifikationsansvar

Verifikationsansvaret kontrollerer, om informationen endte på den korrekte autoritative placering, om den blev flyttet frem for kopieret, og om parallelle permanente forekomster blev undgået.

Placeringsansvaret må ikke selv erklære placeringen korrekt alene fordi den blev valgt.

Resultat: Bestået.

---

## Cirkulære afhængigheder

Den samlede hovedretning er:

Fortolkning
↓
Autoritet
↓
Tilstand
↓
Placering
↓
Eksekvering
↓
Verifikation

Verifikationsansvaret kan rapportere et brud tilbage til et tidligere ansvar, men må ikke selv ændre det tidligere ansvars beslutning.

Fejlretningen er derfor ikke en autoritetscirkel.
Den er et nyt input til en ny ansvarscyklus.

Resultat: Ingen cirkulær autoritetsafhængighed identificeret.

---

## Architectural invariants

### Information has one permanent home

Bevares af Placeringsansvaret og kontrolleres af Verifikationsansvaret.

### Information moves – it is not copied

Besluttes gennem Tilstands- og Placeringsansvaret, realiseres af Eksekveringsansvaret og kontrolleres af Verifikationsansvaret.

### Stable and current information are separated

Placeringsansvaret ejer adskillelsen; ingen andre ansvar må omgå den.

### Runtime and Tooling are separated

Eksekveringsansvaret kan ligge i Runtime eller Tooling, men den tekniske placering giver ikke ny autoritet.

Tooling må ikke gennem eksekvering blive ejer af runtime-sandhed.

### Implementation realizes the architecture – it does not redefine it

Fortolkningsansvaret binder implementeringshandlinger til certificerede regler.
Autoritetsansvaret forhindrer lokale overskridelser.
Verifikationsansvaret kontrollerer, at betydningen blev bevaret.

Resultat: De låste invarianter bevares.

---

## Resultat af horisontal analyse

Alle femten parvise ansvarsrelationer er gennemgået.

Der blev ikke identificeret:

- ulovligt ansvarsoverlap,
- cirkulær beslutningsautoritet,
- skjulte afhængigheder på senere output,
- behov for ny ansvarstype,
- behov for nyt meta-princip.

Den samlede ansvarskæde er ensrettet i sin beslutningsautoritet, mens fejl og afvigelser kan rapporteres tilbage uden at skabe en autoritetscirkel.

**Horisontal analyse: BESTÅET**

**Modifikation af modellen: IKKE PÅKRÆVET**

---

# Minimality Analysis

## Formål

Minimalitetsanalysen undersøger, om Implementation Responsibility Model v1.0 indeholder flere ansvar end nødvendigt, om to eller flere ansvar kan sammenlægges uden tab af arkitektoniske egenskaber, eller om et ansvar kan reduceres yderligere uden at skabe et hul i modellen.

Der anvendes tre prøver:

1. Fjernelsesprøven
2. Sammenlægningsprøven
3. Reduktionsprøven

Et ansvar er kun minimalt nødvendigt, hvis det ikke kan fjernes, sammenlægges eller reduceres uden arkitektonisk tab.

---

## Fortolkningsansvarets minimalitet

### Fjernelsesprøven

Hvis Fortolkningsansvaret fjernes, skal de efterfølgende ansvar selv afgøre, hvad en regel, beslutning eller information betyder.

Dette skaber seks mulige lokale fortolkninger i stedet for én autoriseret betydning.

Resultat: Fortolkningsansvaret kan ikke fjernes.

### Sammenlægningsprøven

Sammenlægning med Autoritetsansvaret ville gøre betydning og legitimitet til samme afgørelse.

Sammenlægning med Tilstandsansvaret ville gøre semantisk type og livscyklusstatus til samme begreb.

Sammenlægning med Placeringsansvaret ville gøre sproglig eller strukturel form til grundlag for permanent hjem.

Sammenlægning med Eksekveringsansvaret ville lade mekanismen fortolke sit eget mandat under udførelse.

Sammenlægning med Verifikationsansvaret ville gøre det muligt at ændre fortolkningen efter at resultatet er kendt.

Resultat: Fortolkningsansvaret kan ikke sammenlægges uden arkitektonisk tab.

### Reduktionsprøven

Fortolkningsansvaret skal mindst kunne fastlægge:

- hvilken overliggende regel der gælder,
- hvad reglen tillader,
- hvad den forbyder,
- hvad der er tvetydigt,
- og hvornår fortolkning skal afvises.

Minimalitetskonklusion: Fortolkningsansvaret er minimalt nødvendigt.

---

## Autoritetsansvarets minimalitet

### Fjernelsesprøven

Hvis Autoritetsansvaret fjernes, findes der fortolkede handlinger, men ingen selvstændig afgørelse af, hvem der har ret til at beslutte dem.

Teknisk mulighed vil kunne glide over i beslutningsret.

Resultat: Autoritetsansvaret kan ikke fjernes.

### Sammenlægningsprøven

Sammenlægning med Fortolkningsansvaret blander betydning og legitimitet.

Sammenlægning med Tilstandsansvaret gør den, der godkender en overgang, til samme instans som definerer dens konsekvens.

Sammenlægning med Placeringsansvaret gør ejerskab af beslutningen og informationshjem til samme funktion.

Sammenlægning med Eksekveringsansvaret lader udføreren autorisere sig selv.

Sammenlægning med Verifikationsansvaret lader godkenderen certificere sit eget mandat.

Resultat: Autoritetsansvaret kan ikke sammenlægges uden arkitektonisk tab.

### Reduktionsprøven

Autoritetsansvaret skal mindst kunne identificere:

- den autoritative ejer,
- anmoderens ret,
- den tilladte delegering,
- autoritetsoverskridelse,
- og eskalering til rette autoritet.

Minimalitetskonklusion: Autoritetsansvaret er minimalt nødvendigt.

---

## Tilstandsansvarets minimalitet

### Fjernelsesprøven

Hvis Tilstandsansvaret fjernes, kan en handling være både fortolket og autoriseret, men modellen mangler en selvstændig funktion for at fastlægge den aktuelle tilstand og den lovlige overgang.

Resultat: Tilstandsansvaret kan ikke fjernes.

### Sammenlægningsprøven

Sammenlægning med Autoritetsansvaret blander legitimitet og transition.

Sammenlægning med Placeringsansvaret binder tilstand til konkret placering.

Sammenlægning med Eksekveringsansvaret lader udføreren vælge transitionen.

Sammenlægning med Verifikationsansvaret lader den forventede tilstand verificere sig selv.

Resultat: Tilstandsansvaret kan ikke sammenlægges uden arkitektonisk tab.

### Reduktionsprøven

Tilstandsansvaret skal mindst kunne fastlægge:

- den aktuelle tilstand,
- den ønskede overgang,
- overgangens lovlighed,
- den nye tilstand,
- og afvisning af ulovlige overgange.

Minimalitetskonklusion: Tilstandsansvaret er minimalt nødvendigt.

---

## Placeringsansvarets minimalitet

### Fjernelsesprøven

Hvis Placeringsansvaret fjernes, kan informationens betydning, legitimitet og tilstand være kendt, men ingen selvstændig funktion ejer dens permanente hjem.

Dette kan skabe duplikering, parallelle sandheder, placering efter mekanisme frem for ansvar og sammenblanding af aktiv og permanent information.

Resultat: Placeringsansvaret kan ikke fjernes.

### Sammenlægningsprøven

Sammenlægning med Tilstandsansvaret ville binde en tilstand til én teknisk eller dokumentmæssig placering.

Sammenlægning med Eksekveringsansvaret ville lade den udførende mekanisme vælge destinationen og dermed kunne lade Tooling definere arkitekturen.

Sammenlægning med Verifikationsansvaret ville lade den funktion, som kontrollerer korrekt placering, have valgt placeringen selv.

Resultat: Placeringsansvaret kan ikke sammenlægges uden arkitektonisk tab.

### Reduktionsprøven

Placeringsansvaret skal mindst fastlægge:

- det permanente hjem,
- ejerskabet af informationen,
- om placeringen er aktiv, midlertidig eller permanent,
- hvilke andre permanente placeringer der er forbudte.

Minimalitetskonklusion: Placeringsansvaret er minimalt nødvendigt.

---

## Eksekveringsansvarets minimalitet

### Fjernelsesprøven

Hvis Eksekveringsansvaret fjernes, findes der beslutninger og forventede ændringer, men ingen ansvarlig funktion for deres gennemførelse.

Resultat: Eksekveringsansvaret kan ikke fjernes.

### Sammenlægningsprøven

Sammenlægning med Autoritetsansvaret lader den udførende funktion godkende sig selv.

Sammenlægning med Tilstandsansvaret lader den funktion, der definerer transitionen, udføre den og kan skjule afvigelser mellem specifikation og resultat.

Sammenlægning med Placeringsansvaret lader mekanismen vælge destinationen.

Sammenlægning med Verifikationsansvaret lader udføreren erklære sit eget resultat korrekt.

Resultat: Eksekveringsansvaret kan ikke sammenlægges uden tab af ansvarssporbarhed og kontrol.

### Reduktionsprøven

Eksekveringsansvaret skal mindst eje:

- gennemførelsen af den autoriserede handling,
- overholdelse af handlingsomfanget,
- produktion af det faktiske resultat,
- teknisk hændelses- eller resultatdata,
- tydelig fejlrapportering.

Minimalitetskonklusion: Eksekveringsansvaret er minimalt nødvendigt.

---

## Verifikationsansvarets minimalitet

### Fjernelsesprøven

Hvis Verifikationsansvaret fjernes, bliver udførelse og korrekthed funktionelt identiske.

Modellen vil ikke selvstændigt kunne afgøre:

- om den forventede tilstand er opnået,
- om den korrekte placering er anvendt,
- om information er blevet flyttet frem for kopieret,
- om autorisationens omfang er overholdt,
- om arkitektoniske invarianter stadig gælder.

Resultat: Verifikationsansvaret kan ikke fjernes.

### Sammenlægningsprøven

Sammenlægning med Eksekveringsansvaret gør eksekveringen både til aktør og dommer.

Sammenlægning med Tilstandsansvaret lader den funktion, der fastlægger forventet sluttilstand, erklære den opnået.

Sammenlægning med Placeringsansvaret lader den funktion, der vælger destinationen, godkende destinationen.

Sammenlægning med Autoritetsansvaret lader den funktion, der legitimerer handlingen, erklære dens resultat gyldigt.

Resultat: Verifikationsansvaret kan ikke sammenlægges uden tab af uafhængighed.

### Reduktionsprøven

Verifikationsansvaret skal mindst kunne sammenholde:

- autoriseret forventning,
- faktisk resultat,
- relevante invarianter,
- identificerede afvigelser,
- certificeringsstatus.

Minimalitetskonklusion: Verifikationsansvaret er minimalt nødvendigt.

---

## Systematisk sammenlægningsanalyse

De seks ansvar giver 15 mulige parvise sammenlægninger.

| Sammenlægning | Primært tab |
| --- | --- |
| Fortolkning + Autoritet | Betydning blandes med legitimitet |
| Fortolkning + Tilstand | Semantisk type blandes med gyldig status |
| Fortolkning + Placering | Sproglig form bestemmer permanent hjem |
| Fortolkning + Eksekvering | Mekanismen fortolker selv sit mandat |
| Fortolkning + Verifikation | Målet kan omfortolkes efter resultatet |
| Autoritet + Tilstand | Legitimitet blandes med transition |
| Autoritet + Placering | Beslutningsret blandes med informationshjem |
| Autoritet + Eksekvering | Udføreren autoriserer sig selv |
| Autoritet + Verifikation | Godkenderen certificerer sit eget mandat |
| Tilstand + Placering | Status defineres gennem fysisk placering |
| Tilstand + Eksekvering | Udføreren vælger selv transition |
| Tilstand + Verifikation | Forventet tilstand verificerer sig selv |
| Placering + Eksekvering | Tooling vælger arkitekturen |
| Placering + Verifikation | Destinationen godkender sig selv |
| Eksekvering + Verifikation | Udføreren erklærer sig selv korrekt |

Alle 15 sammenlægningsforsøg medfører mindst ét af følgende tab:

- autoritetsblanding,
- cirkulær selvbekræftelse,
- svækket sporbarhed,
- omgåelse af en nødvendig beslutningsgrænse,
- tab af Runtime–Tooling-adskillelse,
- tab af uafhængig verifikation,
- tab af Single Source of Truth.

Ingen parvis sammenlægning består derfor minimalitetsprøven.

---

## Kontrol mod de syv certificeringsdimensioner

Intern konsistens: Bestået.

Ansvarsadskillelse: Bestået.

Gensidig uafhængighed: Bestået.

Fuldstændig dækning: Foreløbigt bestået; den endelige fuldstændighed vurderes i næste fase.

Minimalitet: Bestået.

Arkitektonisk stabilitet: Bestået.

Certificeringsklarhed: Bestået.

---

## Resultat af minimalitetsanalysen

Implementation Responsibility Model v1.0 består minimalitetsanalysen.

De seks ansvar repræsenterer seks irreducible arkitektoniske beslutningsfunktioner:

- Betydning
- Legitimitet
- Tilstand
- Placering
- Udførelse
- Kontrol

Ingen funktion kan fjernes uden at skabe et ansvarshul.
Ingen funktion kan overtages af en anden uden at skabe autoritetsblanding.
Ingen to funktioner kan sammenlægges uden tab af uafhængighed, sporbarhed eller arkitektonisk stabilitet.

### Certificeret minimalitetssætning

Implementation Responsibility Model v1.0 indeholder præcis de ansvar, der er nødvendige for at føre information fra fortolket betydning til autoriseret, tilstandsvalid, korrekt placeret, udført og verificeret resultat — og ingen af disse ansvar kan fjernes eller sammenlægges uden arkitektonisk tab.

**Minimalitetsanalyse: BESTÅET**

**Redundante ansvar: INGEN IDENTIFICERET**

**Mulige sammenlægninger: INGEN**

**Nødvendige modelændringer: INGEN**
