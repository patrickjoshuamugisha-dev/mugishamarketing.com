---
title: Hvad er agentisk AI? En enkel guide | Mugisha AI
url: https://mugishamarketing.com/da/viden/hvad-er-agentisk-ai/
language: da
description: Hvad agentisk AI er, forskellen på en chatbot og fast automatisering, eksempler, sikker drift, EU-regler og hvornår du ikke skal bruge det.
---

# Hvad er agentisk AI?

Opdateret: 21. november 2026 · Gennemgået af [Patrick Mugisha](https://mugishamarketing.com/da/om-os/), stifter

Agentisk AI (på engelsk agentic AI) er software, der arbejder hen mod et mål på egen hånd. Den planlægger trinene, bruger værktøjer som mail, kalender eller CRM, tjekker resultatet og justerer, og den stopper og spørger et menneske, når en regel siger det. En chatbot svarer. Et agentisk system udfører opgaver.

## Sådan adskiller agentisk AI sig fra det, du kender

Fire ting bliver ofte blandet sammen. Tabellen viser, hvordan de er forskellige i praksis.

| | Chatbot | Fast automatisering | Enkelt AI-agent | Agentisk AI-system

| Hvad den gør | Svarer på spørgsmål i en samtale | Kører de samme trin, hver gang noget sker | Løser én opgave og vælger selv trinene | En eller flere agenter med regler og kontrolpunkter, der arbejder hen mod et mål på tværs af flere systemer

| Hvem vælger trinene | Du, ét spørgsmål ad gangen | Den, der byggede den, på forhånd | AI-modellen, inden for de grænser du sætter | AI-modellerne, inden for de grænser og kontrolpunkter du sætter

| Rører ved dine systemer | Sjældent | Ja, præcis som bygget | Ja, de værktøjer den får | Ja, gennem flere værktøjer, med log og godkendelser

| Eksempel | Chat på hjemmesiden, der svarer på åbningstider | En formular opretter en kunde i CRM og sender en bekræftelse | Læser en ny henvendelse, finder kunden og skriver et svarudkast | Følger en henvendelse fra første besked til aftalt møde og spørger et menneske, før noget når en kunde

| Største risiko | Et forkert eller opdigtet svar | Går i stå, når input ser anderledes ud end forventet | Tager et forkert skridt på egen hånd | Flere dele, der skal holdes øje med

Anthropics vejledning [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) trækker linjen sådan: Arbejdsgange er »systems where LLMs and tools are orchestrated through predefined code paths«, altså systemer, hvor sprogmodeller og værktøjer styres af kodeveje, der er lagt fast på forhånd. Agenter er »systems where LLMs dynamically direct their own processes and tool usage«, altså systemer, hvor modellen selv styrer sin proces og sin brug af værktøjer. OpenAI skriver i sin [vejledning om agenter](https://developers.openai.com/api/docs/guides/agents), at agenter »can plan and complete tasks using tools, work with other agents, and maintain context across steps«, altså kan planlægge og gennemføre opgaver med værktøjer, samarbejde med andre agenter og holde styr på sammenhængen på tværs af trin. Oversættelserne er vores.

Derfor bruges »agent« og »agentisk« løst. Her betyder »agentisk AI« hele tilgangen, og »agent« betyder én del af den. Det er vores brug af ordene og ikke en officiel definition.

## Eksempler for en virksomhed med 10 til 500 ansatte

Det følgende er eksempler på den slags opgaver, der passer, og ikke resultater fra en kunde.

### Nye henvendelser

Agenten læser en henvendelse fra formularen på hjemmesiden eller fra en indbakke, tjekker i CRM, om kunden allerede findes, skriver et svarudkast og foreslår et tidspunkt til en samtale. Et menneske godkender svaret, før noget bliver sendt.

### Sortering af indkommende mails

Agenten læser beskeder fra kunder og leverandører, finder ordre- eller fakturanummeret, sammenholder det med regnskabssystemet og markerer alt, der ikke passer. Et menneske tager sig af undtagelserne.

### Opfølgning på tilbud

Agenten finder de tilbud, der ikke har fået svar efter et bestemt antal dage, skriver en påmindelse, der passer til tilbuddet, og lægger den i en kø, så sælgeren kan sende eller rette den.

### Data mellem systemer

Når en aftale er vundet, tjekker agenten, at kundeoplysningerne er komplette, opretter kunde og projekt i det andet system og samler en liste over det, der mangler, så et menneske kan udfylde det.

## Sådan kører du den sikkert

- **Et menneske godkender alt, der forlader virksomheden.** Anthropic skriver, at agenter kan »pause for human feedback at checkpoints or when encountering blockers«, altså holde pause og spørge et menneske ved kontrolpunkter eller forhindringer. Vi starter med, at agenten skriver udkast, og et menneske sender.

- **Grænser.** Bestem, hvilke værktøjer og hvilke data agenten må nå, og hvor mange trin den må tage. Anthropic anbefaler »stopping conditions (such as a maximum number of iterations) to maintain control«, altså stopbetingelser som et højeste antal runder.

- **En log.** Hvert trin, agenten tager, bliver skrevet ned, så du kan se, hvad der skete og hvorfor, og rette det, hvis noget går galt.

- **Test før brug.** Anthropic anbefaler »extensive testing in sandboxed environments, along with the appropriate guardrails«, altså omfattende test i afskærmede miljøer med passende værn. Vi kører en agent på testdata, før den rører ved rigtige kunder.

- **EU-reglerne.** Europa-Kommissionen skriver, at AI-forordningen trådte i kraft 1. august 2024 og er gældende fra 2. august 2026 med visse undtagelser. Mennesker skal have besked, når de taler med en maskine, og »appropriate human oversight measures« er et krav til højrisikosystemer, altså passende menneskeligt tilsyn. Om en brug er højrisiko, er et juridisk spørgsmål, så spørg din rådgiver, hvis det handler om beslutninger om mennesker.

- **Personoplysninger.** Hvis agenten behandler personoplysninger, så aftal, hvor data behandles, og hvem der er databehandler, før den første kørsel, som du ville gøre med ethvert værktøj, der er omfattet af GDPR.

## Hvornår du ikke skal bruge agentisk AI

Anthropic anbefaler at »find the simplest solution possible, and only increase complexity when needed«, og skriver, at agentiske systemer ofte bytter hastighed og pris for bedre resultater (»agentic systems often trade latency and cost for better task performance«). I praksis skal du lade være, når:

- trinene altid er de samme, fordi almindelig automatisering er enklere og lettere at kontrollere;

- en fejl er dyr og ikke kan fortrydes, for eksempel en betaling eller en kontrakt;

- ingen i virksomheden vil eje resultatet og læse loggen;

- data ligger steder, ingen kan komme til, for en agent kan ikke arbejde med det, den ikke kan se.

## Sådan kommer du i gang

- Vælg én snæver opgave, som en bestemt person løser i dag og er træt af.

- Skriv trinene ned, som personen gør dem, og hvordan et godt resultat ser ud.

- Lad agenten foreslå, og lad personen bestemme de første uger.

- Sammenlign agentens forslag med det, personen selv ville have gjort, og ret reglerne til.

- Giv kun agenten mere frihed, hvor loggen viser, at den har haft ret.

Når du er klar til at bygge en, kan du læse om vores [AI-agenter](https://mugishamarketing.com/da/ai-agenter/). Er du usikker på, hvilken opgave du skal starte med, begynder vores [AI-konsulentydelse](https://mugishamarketing.com/da/ai-konsulent/) netop med det spørgsmål.

## Ofte stillede spørgsmål

### Hvad er agentisk AI på almindeligt dansk?

Det er AI, der udfører en opgave i stedet for kun at svare på et spørgsmål. Den planlægger trinene, bruger dine værktøjer, tjekker resultatet og spørger et menneske, når en regel siger det. Tænk på en ny kollega med én afgrænset opgave og klare grænser.

### Hvad er forskellen på en AI-agent og agentisk AI?

En AI-agent er ét stykke software, der løser en opgave. Agentisk AI er den bredere tilgang, hvor en eller flere agenter arbejder hen mod et mål med regler, godkendelser og log omkring sig. Ordene bruges løst, så spørg, hvad en leverandør mener.

### Er agentisk AI det samme som en chatbot?

Nej. En chatbot taler med dig og svarer. Et agentisk system handler også: det kan læse en henvendelse, slå en kunde op, opdatere en post eller skrive et udkast. Derfor har det brug for grænser og godkendelsestrin, som en enkel chatbot ikke behøver.

### Er agentisk AI sikkert for en virksomhed?

Det kan bruges ansvarligt, men det er ikke sikkert af sig selv. Giv den en snæver opgave, begræns de værktøjer og data, den kan nå, før log over hvert trin, og lad et menneske godkende alt, der forlader virksomheden. Start med forslag, før den handler.

### Gælder EU’s AI-forordning for agentisk AI?

Europa-Kommissionens side skriver, at AI-forordningen er gældende fra 2. august 2026 med visse undtagelser, og at den sorterer AI-systemer efter risiko. Hvilket niveau en agent hører under, afhænger af, hvad den gør. Vi giver ikke juridisk rådgivning, så spørg din rådgiver, hvis det rammer mennesker.

### Skal vi bruge agentisk AI, eller er almindelig automatisering nok?

Er trinene altid de samme, er almindelig automatisering enklere, billigere i drift og lettere at kontrollere. Agentisk AI er værd at overveje, når input varierer, og et menneske i dag bruger tid på at læse, sortere og beslutte, hvad der skal ske nu.

Flere enkle guides finder du under [viden om AI](https://mugishamarketing.com/da/viden/), eller [skriv til os](https://mugishamarketing.com/da/kontakt/) med den opgave, du har i tankerne.

## Læs videre

- [n8n, Make eller Zapier](https://mugishamarketing.com/da/viden/n8n-make-eller-zapier/)

- [RPA eller AI-automatisering](https://mugishamarketing.com/da/viden/rpa-eller-ai-automatisering/)

- [Hvad er en AI-audit?](https://mugishamarketing.com/da/viden/hvad-er-en-ai-audit/)

- [AI i danske virksomheder: tal og kilder 2026](https://mugishamarketing.com/da/viden/ai-i-danske-virksomheder/)

## Kilder

Sider vi har læst, tjekket 20. november 2026:

- [Anthropic, Building effective agents (19. december 2024)](https://www.anthropic.com/engineering/building-effective-agents): https://www.anthropic.com/engineering/building-effective-agents

- [OpenAI, Agents guide](https://developers.openai.com/api/docs/guides/agents): https://developers.openai.com/api/docs/guides/agents

- [European Commission, AI Act (regulatory framework for AI)](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai

## Kan en agent hjælpe?

Fortæl os, hvilken opgave du vil have af dit teams bord. Vi siger, om en agent passer, eller om almindelig automatisering er nok.

[Kontakt os](https://mugishamarketing.com/da/kontakt/)

---
Mugisha AI (Mugisha Marketing, CVR 42773786), Hannemanns Allé 44H, 2300 Copenhagen S, Denmark. Phone +45 30 20 32 29. https://mugishamarketing.com/
