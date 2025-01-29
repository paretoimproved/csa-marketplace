# Payment Subsystem Architecture

## Idempotent Payment Flow
```mermaid
sequenceDiagram
  participant C as Consumer
  participant F as Frontend
  participant P as Payment Service
  participant S as Stripe
  participant DB as Ledger DB

  C->>F: Initiate payment
  F->>P: POST /payments {idempotency_key}
  P->>DB: Check idempotency key
  alt New Request
    P->>S: Create PaymentIntent
    S-->>P: client_secret
    P->>DB: Store transaction
    P-->>F: Payment details
    F->>C: Show payment UI
    C->>S: Complete payment (client-side)
    S->>P: Webhook event
    P->>DB: Update transaction status
    P->>F: Notify result
  else Duplicate
    DB-->>P: Existing transaction
    P-->>F: Return cached result
  end
```

## Reconciliation Process
```mermaid
graph TD
  A[Daily Cron] --> B[Fetch Stripe Transactions]
  B --> C[Compare with Ledger]
  C -->|Match| D[Mark Verified]
  C -->|Mismatch| E[Generate Alert]
  E --> F[Manual Review]
  F --> G[Update Ledger]
  G --> H[Audit Trail]
```

## Failure Modes
| Scenario          | Mitigation                          | Recovery Process                 |
|-------------------|-------------------------------------|-----------------------------------|
| Double charging   | Idempotency keys                   | Automated refunds                |
| Webhook loss      | Stripe event replay                | Manual sync via API              |
| Currency mismatch | Pre-check farm settings            | Convert via ECB rates + 0.5% fee | 