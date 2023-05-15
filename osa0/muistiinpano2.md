sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
	Note over server: Processing new note request
    server-->>browser: 201 Created
    deactivate server

	Note right of browser: The new note is created