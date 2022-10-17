"use strict";

class UserCl {
  constructor(
    firstName,
    lastName,
    username,
    password,
    category = "technology",
    pageSize = 5
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;

    // Settings PART
    this.category = category;
    this.pageSize = pageSize;
  }

  // Get news API
  async getNews(country, category, pageSize, page) {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=e292bc43ab974ca6bd15a2e6aa3c2e5a`;      
      // API key: e292bc43ab974ca6bd15a2e6aa3c2e5a
      // API Key: cd6eeb1895ff45f0afdd4e320c054d00

      const resNews = await fetch(url);

      // Manually Error handle
      if (!resNews.ok) throw new Error("Problem load data News");

      const dataNews = await resNews.json();

      return dataNews;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // Get Search API
  async getSearch(q, pageSize, page) {
    try {
      const url = `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&page=${page}&apiKey=e292bc43ab974ca6bd15a2e6aa3c2e5a`;
      // API key: e292bc43ab974ca6bd15a2e6aa3c2e5a
      // API Key: cd6eeb1895ff45f0afdd4e320c054d00

      const resSearch = await fetch(url);
      // Manually Error handle
      if (!resSearch.ok)
        throw new Error(`Problem load data News (${resSearch.status})`);

      const dataSearch = await resSearch.json();

      return dataSearch;
    } catch (err) {
      alert(err.message);
    }
  }
}

class TaskCl {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
