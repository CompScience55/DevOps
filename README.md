# Zusatzleistung für das Modul DevOps

Idee: Ein System zur Spielerverwaltung -> Fokus auf Pipeline

### Funktionen Anwendung: 
- Spieler erstellen
- Spieler bearbeiten
- Spieler löschen
- Spieler anzeigen

### Technologie-Stack: 
- CI Pipeline in GitHub
- Git als Versionsverwaltung 
- HTML, CSS, Javascript -> Frontend in Angular
- Spring Boot -> Backend

### Ausführen des Projekts:
1. Repository klonen
2. Run Configuration erstellen:
   3. DevOpsApplication mit Verwendung von Profil "ci"
3. Ausführen
4. Navigation in Ordner "frontend"
5. Terminal -> ng serve
6. Browser öffnen und http://localhost:4200/ eingeben

# Pipeline:
- Workflow-Name: CI Workflow

## Trigger:

- Bei jedem Push auf den Branch master

- Bei jedem Pull Request gegen den Branch master

- Manuell per “Workflow dispatch”

## Job: backend – Build und Tests für das Java-Backend

    Läuft auf: ubuntu-latest
    
    Setzt Umgebungsvariablen:
    
    SPRING_PROFILES_ACTIVE=ci
    
    CI=true
    
    Steps:
    
    Code auschecken: actions/checkout@v3
    
    Java 17 installieren: actions/setup-java@v3 (Temurin)
    
    Maven-Cache anlegen: actions/cache@v3 für ~/.m2/repository, keyed nach Hash der pom.xml
    
    Build & Tests ausführen:
    
    Wechselt ins Verzeichnis DevOps
    
    Führen mvn clean install und mvn test aus

## Job: frontend – Build und Tests für das Angular-Frontend

    Läuft auf: ubuntu-latest
    
    Steps:
    
    Code auschecken: actions/checkout@v3
    
    Node.js 18 installieren: actions/setup-node@v3
    
    npm-Cache anlegen: actions/cache@v3 für ~/.npm, keyed nach Hash der package-lock.json
    
    Dependencies installieren:
    
    Wechselt ins frontend-Verzeichnis
    
    npm install
    
    Frontend-Tests ausführen:
    npm test -- --watch=false --browsers=ChromeHeadless
    
    Frontend bauen: npm run build im frontend-Verzeichnis
