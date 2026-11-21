---
title: RPA eller AI-automatisering: forskellen | Mugisha AI
url: https://mugishamarketing.com/da/viden/rpa-eller-ai-automatisering/
language: da
description: RPA, workflow-automatisering, AI-automatisering og AI-agenter sammenlignet: hvordan de virker, hvad der vælter dem, fire eksempler og hvornår du skifter.
---

# RPA eller AI-automatisering: hvad er forskellen?

Opdateret: 21. november 2026 · Gennemgået af [Patrick Mugisha](https://mugishamarketing.com/da/om-os/), stifter

RPA gentager faste klik og tastetryk på skærme og virker, så længe input og skærmbilleder er de samme. AI-automatisering bruger en sprogmodel til at læse og vurdere rodet input som mails og dokumenter, og en arbejdsgang handler så på resultatet. De fleste rigtige opgaver bruger begge: regler til trinene, AI til læsningen.

## De fire slags side om side

»Automatisering« dækker fire forskellige ting. Tabellen er vores sammenfatning af, hvordan de adskiller sig i praksis.

| | RPA | Workflow-automatisering (n8n, Make, Zapier) | AI-automatisering | AI-agent

| Sådan virker det | En softwarerobot gentager optagne handlinger på skærme | Trin koblet sammen gennem programmernes egne grænseflader, i fast rækkefølge | En arbejdsgang med et eller flere trin, hvor en AI-model læser, sorterer eller skriver udkast | En model vælger selv værktøjer og rækkefølge inden for fastsatte grænser

| Hvad den kan tage imod | Struktureret input med samme layout hver gang | Struktureret data fra programmer, formularer og filer | Fri tekst, dokumenter og blandede formater | Åbne opgaver med varierende input

| Hvad der vælter den | En flyttet knap, et nyt skærmlayout, en pop-up | Et ændret felt eller en ændret grænseflade | En forkert læsning af usædvanligt input | Et forkert skridt, den tager på egen hånd

| Typisk brug | Flytte data i et system, der ikke har andre veje ind | Formular til CRM, ordre til faktura, notifikationer | Sortere mail, læse fakturaer, skrive svarudkast | Slå op på tværs af systemer og foreslå næste skridt

## Hvad leverandørerne selv skriver

UiPath, en stor RPA-leverandør, skriver: »Robotic process automation (RPA) uses software robots to automate repetitive, rule-based tasks like data entry and system integration«, altså softwarerobotter til gentagne, regelstyrede opgaver. Microsoft beskriver sine desktop flows til »simple or complex rule-based tasks on their workstations« og skriver, at man kan arbejde med maskinen »by using application UI elements, images, or coordinates«, altså via elementer på skærmen, billeder eller koordinater.

IBM trækker linjen op mod AI: »The critical difference is that RPA is process-driven, whereas AI is data-driven.« IBM tilføjer: »RPA bots can follow only the processes defined by an end user, while AI bots use machine learning to recognize patterns in data, in particular unstructured data, and learn over time.« Kort sagt følger RPA en proces, som et menneske har defineret, mens AI lærer mønstre i data.

Om den sidste kolonne skriver n8n's dokumentation, at »the agent decides which tools to call to complete a task«. Anthropic skelner mellem workflows, »systems where LLMs and tools are orchestrated through predefined code paths«, og agenter, »systems where LLMs dynamically direct their own processes and tool usage«. Vores [guide til agentisk AI](https://mugishamarketing.com/da/viden/hvad-er-agentisk-ai/) går længere ind i agentsiden.

## Fire opgaver, fire svar

Det er illustrationer af, hvordan vi ville sortere opgaver, ikke kundeforløb.

### En leverandørportal uden andre veje ind

Medarbejdere kopierer fakturalinjer fra en portal ind i regnskabssystemet. Portalen har ingen integration, og siderne ser ens ud hver gang. Det er RPA-terræn. Tilbyder portalen en grænseflade til data, er en arbejdsgang mere stabil.

### En formular, der skal oprette en post

En formular på hjemmesiden skal oprette en kontakt i CRM og sende en bekræftelse. Input er struktureret, og trinene ændrer sig aldrig. En almindelig arbejdsgang i n8n, Make eller Zapier klarer det uden AI. Vores [sammenligning af n8n, Make og Zapier](https://mugishamarketing.com/da/viden/n8n-make-eller-zapier/) hjælper dig med at vælge.

### Kundemails i fri tekst

Der kommer mails om ordrer, forsinkelser og returneringer, hver formuleret forskelligt. En model læser hver mail og finder emnet og ordrenummeret. En arbejdsgang lægger den på plads, og et menneske godkender alt, der går til en kunde. Det er AI-automatisering.

### En henvendelse, der kræver flere opslag

En leverandør spørger, hvorfor en levering er forsinket. For at svare skal man se i ordresystemet, fragtbeskeden og tidligere mails og så vælge, hvad der skal ske. Det passer til en agent med snævre værktøjer og en log, som starter i forslagstilstand.

## Sådan kombinerer du dem

Efter vores erfaring bruger de stærkeste løsninger hver slags, hvor den er billigst og mest forudsigelig. En arbejdsgang er rygraden og flytter data mellem programmer. Et AI-trin læser rodet input. Et RPA-trin bruges kun, hvor et program ikke har andre døre. En agent sparer vi til den del, der virkelig varierer, og et menneske godkender det, der forlader virksomheden. Anthropics råd gælder: »we recommend finding the simplest solution possible, and only increasing complexity when needed«.

Vores sider om [AI-automatisering](https://mugishamarketing.com/da/ai-automatisering/), [n8n](https://mugishamarketing.com/da/n8n-konsulent/) og [AI-agenter](https://mugishamarketing.com/da/ai-agenter/) beskriver, hvad vi bygger i hvert tilfælde.

## Tre spørgsmål til at sortere en opgave

Stil dem i rækkefølge. Det er vores egen tommelfingerregel.

- Har programmet en grænseflade til sine data? Så brug en arbejdsgang. Er skærmen den eneste vej ind, er RPA en kandidat.

- Har input altid samme form? Er det fri tekst eller dokumenter, så tilføj et AI-trin, der læser det.

- Afhænger næste skridt af, hvad der blev fundet? Er vejen ikke kendt på forhånd, så overvej en agent med grænser og godkendelse.

## Behold RPA-robotten eller skift den?

Det er vores vurdering, ikke en regel. Behold en robot, når den kører stabilt, skærmene sjældent ændrer sig, input er struktureret, og nogen ved, hvordan den virker. Et skift koster så mere, end det sparer.

Overvej at skifte, når:

- den stopper hver gang skærmlayoutet ændrer sig, og det tager længere at rette end selve opgaven;

- input er blevet til fri tekst, som robotten ikke kan læse;

- programmet nu har en grænseflade til data, så skærmene ikke længere er nødvendige;

- ingen kan sige, hvordan den virker, eller hvem der ejer den.

Også da bør du skifte én opgave ad gangen og køre gammelt og nyt side om side, før robotten slukkes.

## Ofte stillede spørgsmål

### Hvad er forskellen på RPA og AI-automatisering?

RPA gentager faste handlinger på skærme og kræver det samme input hver gang. AI-automatisering tilføjer en model, der kan læse og vurdere varierende input, for eksempel en mail. I de fleste projekter kombineres de to med et værktøj til arbejdsgange.

### Er RPA det samme som workflow-automatisering?

Nej. RPA arbejder på skærmen, som et menneske ville. Værktøjer som n8n, Make og Zapier kobler programmer sammen gennem deres egne grænseflader. Hvor et program har en, er en arbejdsgang som regel det mest stabile valg.

### Er en AI-agent bedre end RPA?

Ikke i sig selv. En agent kan klare varieret input, men vælger selv sine trin og har derfor brug for grænser, log og godkendelse. Til en fast opgave med stabile skærme er RPA eller en almindelig arbejdsgang enklere og lettere at kontrollere.

### Kan AI erstatte vores RPA-robotter?

Nogle gange, delvist. Hvor en robot fejler, fordi input varierer, kan et AI-trin overtage læsningen. Robotter, der kører stabilt på faste skærme, kan blive. Skift én opgave ad gangen.

### Har vi brug for RPA, hvis vi bruger n8n, Make eller Zapier?

Ofte ikke. Har programmerne grænseflader, når arbejdsgangsværktøjerne dem direkte. RPA er mest nyttig, hvor et program kun kan bruges gennem skærmen.

### Hvor starter vi, hvis vi er i tvivl om, hvad der passer?

Skriv én opgave ned, dens input og hvor ofte inputtet ændrer sig. Fast input peger på en arbejdsgang eller RPA. Fri tekst peger på AI-automatisering. Fortæl os opgaven, så siger vi, hvad der passer.

Flere enkle guides finder du under [viden om AI](https://mugishamarketing.com/da/viden/), eller [skriv til os](https://mugishamarketing.com/da/kontakt/) med den opgave, du har i tankerne.

## Læs videre

- [Hvad er agentisk AI?](https://mugishamarketing.com/da/viden/hvad-er-agentisk-ai/)

- [n8n, Make eller Zapier](https://mugishamarketing.com/da/viden/n8n-make-eller-zapier/)

- [Hvad er en AI-audit?](https://mugishamarketing.com/da/viden/hvad-er-en-ai-audit/)

- [AI i danske virksomheder: tal og kilder 2026](https://mugishamarketing.com/da/viden/ai-i-danske-virksomheder/)

## Kilder

Sider vi har læst, tjekket 20. november 2026:

- [UiPath, What is robotic process automation](https://www.uipath.com/rpa/robotic-process-automation): https://www.uipath.com/rpa/robotic-process-automation

- [Microsoft Learn, Introduction to desktop flows (Power Automate)](https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction): https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction

- [IBM, What is robotic process automation (RPA)?](https://www.ibm.com/think/topics/rpa): https://www.ibm.com/think/topics/rpa

- [n8n documentation, AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/

- [Anthropic, Building effective agents (19. december 2024)](https://www.anthropic.com/engineering/building-effective-agents): https://www.anthropic.com/engineering/building-effective-agents

## Hvilken slags passer til dig?

Fortæl os opgaven og hvad den tager imod. Vi siger, om RPA, en arbejdsgang, AI eller en agent passer.

[Kontakt os](https://mugishamarketing.com/da/kontakt/)

---
Mugisha AI (Mugisha Marketing, CVR 42773786), Hannemanns Allé 44H, 2300 Copenhagen S, Denmark. Phone +45 30 20 32 29. https://mugishamarketing.com/
