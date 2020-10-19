# Data Format

`!` - Not null i.e required

`[type]` - Array of _type_

## General Profile Information

```raphql
name: String!
email: String!
github: String!
website: String
linkedin: String
cv: String
seekingEmployment: Boolean!
otherLinks: [Link!]
```

Example

```JSON
{
  "name": "Your Name",
  "email": "your.name@email.com",
  "github": "https://github.com/YourProfile",
  "website": "https://yourwebsite.com",
  "linkedin": "https://linkedin.com/in/yourname",
  "cv": "https://domain.com/your_cv_resume.pdf",
  "seekingEmployment": true,
  "otherLinks": [
    {
      "name": "Site Name",
      "url": "https://site.com"
    }
  ]
}
```

## Experience

Work Experience

```Graphql
company: String!
role: String!
roleDescription: String
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
      "roleDescription" : "At Company name I worked on ...",
      "started": "January 2019",
      "finished": "February 2019"
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
