function buildTables(verb) {
  let html = ''
  for (tense of [verb.pres, verb.past, verb.pastf, verb.fut]) {
    html += `
    <table class="conj-table">
    <thead>
      <tr>
        <td colspan="4">
          ${tense.title}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="person">
          1sg
          </td>
          <td>
          ${tense["1sg"]}
        </td>
        <td class="person">
        1pl
      </td>
      <td>
      ${tense["1pl"]}
    </td>
      </tr>
      <tr>
      <td class="person">
        2sg
        </td>
        <td>
        ${tense["2sg"]}
      </td>
      <td class="person">
      2pl
    </td>
    <td>
    ${tense["2pl"]}
  </td>
    </tr>
    <tr>
    <td class="person">
      3sg
      </td>
      <td>
      ${tense["3sg"]}
    </td>
    <td class="person">
    3pl
  </td>
  <td>
  ${tense["3pl"]}
</td>
  </tr>
    </tbody>
  </table>
    `
  }
  return html
}

function buildImpTable(verb) {
  let html = ` 
  <table class="conj-table">
<thead>
  <tr>
    <td colspan="4">
      ${verb.imp.title}
    </td>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="person">
      1pl
      </td>
      <td>
      ${verb.imp["1pl"]}
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  <tr>
  <td class="person">
    2sg
    </td>
    <td>
    ${verb.imp["2sg"]}
  </td>
  <td class="person">
  2pl
</td>
<td>
${verb.imp["2pl"]}
</td>
</tr>
</tbody>
</table>
`
  return html
}

function conjTable(verb) {
  return `
  <h1>${verb.inf}, ${verb.basicPres}, ${verb.basicPast}</h1>
  ${buildTables(verb)}
  ${buildImpTable(verb)}
  `
}

module.exports = conjTable