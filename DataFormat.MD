# Data Format

`!` - Not null i.e required
`[type]` - Array of _type_

## General Profile Information

```Graphql
name: String!
email: String!
github: String!
CV: String!
employed: Boolean!
```

Example

```JSON
{
  "name": "Your Name",
  "email": "your.name@email.com",
  "github": "https://github.com/YourProfile",
  "CV": "https://domain.com/your_cv_resume.pdf",
  "employed": true,
}
```

## Experience

Work Experience

```Graphql
company: String!
role: String!
started: String! # Date. In whatever format.
finished: String # Date. In whatever format.
```

Example

```JSON
{
  "experience": [
    {
      "company": "Company Name",
      "role": "Software Developer",
      "started": "January 2019"
    }
  ]
}
```

## Projects

```Graphql
title: String!
description: String!
website: String
sourceCode: String!
images: [String]
links: [Link] # Extra links.
tags: [String]!
```

Example

```JSON
{
  "projects": [
      {
        "title": "Just Java",
        "description": "A sample food delivery application for a coffee shop.",
        "website": "https://marknjunge.com/justjava",
        "sourceCode": "https://github.com/MarkNjunge/JustJava-Android",
        "images": [
          "https://res.cloudinary.com/marknjunge/image/upload/v1561576438/portfolio-images/just-java-small-mockup.png"
        ],
        "links": [
          {
            "name": "PlayStore",
            "url": "https://play.google.com/store/apps/details?id=com.marknkamau.justjava"
          },
          {
            "name": "Latest build",
            "url": "https://skyll.herokuapp.com/justjava?redirect=true"
          }
        ],
        "tags": ["Kotlin", "Firebase", "RxJava", "M-Pesa", "PlayStore"]
      }
  ]
}
```

## Repos

Obtained directly from Github
