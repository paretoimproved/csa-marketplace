# FarmLink Architecture (v2.1)

## Design Principles
1. **Farm-Centric Scaling**: Regional sharding for produce types
2. **Fault Isolation**: Bulkhead pattern for payment processing
3. **Zero-Downtime**: Blue/green deployment ready
4. **Data Locality**: GDPR-compliant storage architecture

## System Context
```mermaid
C4Context
  title System Context
  Person(farmer, "Farmer", "Manages CSA listings via web UI")
  Person(consumer, "Consumer", "Discovers farms via search")
  System(farmlink, "FarmLink API", "Node.js/Express", "Handles core operations")
  SystemDb(postgres, "PostgreSQL", "Stores farm profiles and user data")
  System_Ext(stripe, "Stripe API", "Processes payments")
  
  Rel(farmer, farmlink, "Uses", "REST API")
  Rel(consumer, farmlink, "Queries", "HTTPS")
  Rel(farmlink, postgres, "Reads/Writes", "Prisma ORM")
  Rel(farmlink, stripe, "Processes payments", "API")
```
---

## Container Diagram
```mermaid
C4Container
  title Container View
  Person(farmer, "Farmer", "Manages CSA listings")
  Person(consumer, "Consumer", "Discovers farms")

  System_Boundary(platform, "FarmLink Platform") {
    Container(web_app, "Web Client", "React", "Farmer dashboard UI")
    Container(api, "API Server", "Express.js", "REST endpoints")
    ContainerDb(postgres, "Database", "PostgreSQL", "Stores farm data")
  }

  Rel(farmer, web_app, "Uses")
  Rel(web_app, api, "API calls")
  Rel(api, postgres, "Prisma queries")
  Rel(consumer, api, "Search requests")
```
---

## Quality Attributes
| Attribute | Current Implementation |
|-----------------|-----------------------------------|
| Security | JWT auth, password hashing |
| Resilience | Prisma connection pooling |
| Performance | Eager loading in API endpoints |
| Maintain | TypeScript, Express router modules|