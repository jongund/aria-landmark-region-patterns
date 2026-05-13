  /*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');

/* Constants */

const version     = "1.0";
const tagLineName = "ARIA Landmark Region Patterns";
const projectName   = "ARIA Landmark Region Patterns Example";

const issuesURL   = "https://github.com/aria-landmark-region-patterns/issues";
const issuesEmail = "jongund@illinois.edu";

const outputDirectory   = './docs/';
const templateDirectory = './src-docs/';
const websiteURL        = 'https://opena11y.github.io/h2l-side-panel/';
const repositoryURL     = 'https://github.com/opena11y/h2l-side-panel';

// setUseCodeTags(true);

/* Helper functions */

function outputFile(fname, data) {
  fs.writeFile(path.join(outputDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}

function outputTemplate(fname, data) {
  fs.writeFile(path.join(templateDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}


const mainPages = [
  { content: 'content-home.njk',
    title: 'Design Patterns',
    link: 'Home',
    filename: 'index.html'
  },
  { content: 'content-html.njk',
    title: 'HTML Landmark Elements',
    link: 'HTML',
    filename: 'content-html.html'
  },
  { dropdown: 'Landmarks',
    pages: [
      { content: 'content-landmark-banner.njk',
        title: 'Banner Landmark',
        link: 'Banner',
        filename: 'landmark-banner.html'
      },
      { content: 'content-landmark-complementary.njk',
        title: 'Complementary Landmark',
        link: 'Complementary',
        filename: 'landmark-complementary.html'
      },
      { content: 'content-landmark-contentinfo.njk',
        title: 'Contentinfo Landmark',
        link: 'Contentinfo',
        filename: 'landmark-contentinfo.html'
      },
      { content: 'content-landmark-form.njk',
        title: 'Form Landmark',
        link: 'Form',
        filename: 'landmark-form.html'
      },
      { content: 'content-landmark-main.njk',
        title: 'Main Landmark',
        link: 'Main',
        filename: 'landmark-main.html'
      },
      { content: 'content-landmark-navigation.njk',
        title: 'Navigation Landmark',
        link: 'Navigation',
        filename: 'landmark-navigation.html'
      },
      { content: 'content-landmark-region.njk',
        title: 'Region Landmark',
        link: 'Region',
        filename: 'landmark-region.html'
      },
      { content: 'content-landmark-search.njk',
        title: 'Search Landmark',
        link: 'Search',
        filename: 'landmark-search.html'
      }
    ]
  },
  { content: 'content-at.njk',
    title: 'Assistive Technology Support',
    link: 'AT Support',
    filename: 'at-support.html'
  },
  { content: 'content-resources.njk',
    title: 'ARIA Landmark Resources',
    link: 'Resources',
    filename: 'resources.html'
  },
  { content: 'content-about.njk',
    title: 'About',
    link: 'About',
    filename: 'about.html'
  }
  ];

// Create content files

function createNavigation(pages) {
  console.log(`[create Navigation]`);
  let html = '\n';
  pages.forEach( item => {
    console.log(`[create Navigation]: ${item.dropdown} ${item.filename}`);
    if (item.dropdown) {
      html += `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"
             data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false">${item.dropdown}</a>
          <ul class="dropdown-menu">`;

      item.pages.forEach( p => {
        console.log(`[dropdown][page]: ${p.filename}`);
        if (p.filename) {
          html += `<li><a class="dropdown-item" href="${p.filename}">${p.link}</a></li>`;
        }
        else {
          if (p.url) {
          html += `<li><a class="dropdown-item" href="${p.url}">${p.link}</a></li>`;
          }
          else {
            html += `<li><hr class="dropdown-divider"></li>`;
          }
        }
      });

      html += `
          </ul>
        </li>
      `;
    }
    else {
      html += `
        <li class="nav-item">
          <a class="nav-link" href="${item.filename}">${item.link}</a>
        </li>
      `;
    }
  });
  html += '\n';

  return html;
}

const mainNav = createNavigation(mainPages);


function createPage(page, mainNav, dropdownName='', dropdownPages=false) {
  if (page.filename) {
    console.log(`  [createPage]: ${page.filename}`);

    outputFile(page.filename,
      nunjucks.render('./src-docs/page.njk',{
        content: page.content,
        navigation: mainNav,
        dropdownName: dropdownName,
        dropdownPages: dropdownPages,
        websiteURL: websiteURL,
        repositoryURL: repositoryURL,
        projectName: projectName,
        tagLineName: tagLineName,
        issuesURL: issuesURL,
        issuesEmail: issuesEmail,
        version: version,
        title: page.title
      })
    );
  }
}


// createPages(supportPages);

function createPages(pages) {
  console.log(`[create pages]`);
  pages.forEach( item => {
    if (item.dropdown) {
      item.pages.forEach( p => {
        createPage(p, mainNav, item.dropdown, item.pages);
      });
    }
    else {
      createPage(item, mainNav);
    }
  });
}

createPages(mainPages);


