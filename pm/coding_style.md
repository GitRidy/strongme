# Coding Style - StrongMe Web App v0

*RevC*

### Entity Name Case Format

Use `lower_snake_case` everywhere

*(Includes: table names, field names, identifiers, filenames, folder names)*

### Identifiers

- Id column names: `id` when primary key in parent table, `table_id` when foreign key in a secondary table
- Use prefixed strings as ids, e.g.:
  - `tn997` for transaction id 997

### Component Naming

Use `PascalCase` for component files and function names
- `TimerConsole.jsx`, `DayPlanSection.jsx`

### Folder Structure
```
/src
  /components    # Reusable UI components
  /pages         # Top-level views (if any)
  /hooks         # Custom hooks
  /utils         # Helper functions
  /data          # Type definitions, data transforms
```
