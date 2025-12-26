import sqlite3

conn = sqlite3.connect('app.db')
tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
print("Tables in app.db:")
for table in tables:
    print(f"  - {table[0]}")
conn.close()