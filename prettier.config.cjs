module.exports = {
  // false -> { foo: bar }   |   true -> { foo: bar } con espacios extra
  bracketSpacing: false,
  // (deprecado en Prettier 2+) controlaba si el > de un JSX multilínea iba en su propia línea
  jsxBracketSameLine: false,
  // usa comillas simples ('texto') en vez de dobles ("texto")
  singleQuote: true,
  // no añade coma final en el último elemento de arrays/objetos/params
  trailingComma: 'none',
  // longitud máxima de línea antes de que Prettier haga salto de línea
  printWidth: 100,
  // añade punto y coma al final de cada sentencia
  semi: true,

  /* --- Opciones disponibles pero desactivadas (comentadas) ---

  * número de espacios por nivel de indentación (default: 2)
    - tabWidth: 2,
  * usa tabuladores en vez de espacios para indentar
    - useTabs: false, 
  * comillas simples también en las propiedades de objetos JSX (<Foo bar='baz' />)
    - jsxSingleQuote: false, 
  * dónde va el '>' de la etiqueta de cierre multilínea: 'always' (misma línea) o 'below'
    - bracketSameLine: false, 
  * pon '(' entre paréntesis los parámetros de arrow function siempre ('always') o solo si hace falta ('avoid')
    - arrowParens: 'always', 
  * salto de línea al final del archivo: 'lf' (unix), 'crlf' (windows), 'cr', 'auto'
    - endOfLine: 'lf', 
  * formatea también el código embebido en template literals (ej. CSS-in-JS, GraphQL)
    - embeddedLanguageFormatting: 'auto', 
  * controla los espacios en blanco dentro de <script> y <style> en Vue: 'css' o 'strict'
    - vueIndentScriptAndStyle: false,
  * en Markdown, cómo tratar el ajuste de línea del prosa: 'preserve', 'always' o 'never'
    - proseWrap: 'preserve', 
  * en HTML, respeta o ignora la sensibilidad de espacios en blanco del propio HTML
    - htmlWhitespaceSensitivity: 'css',  
  * añade @format al inicio de archivos que aún no lo tengan (útil en migraciones graduales)
    - insertPragma: false, 
  * solo formatea archivos que ya tengan el pragma @format al inicio
    - requirePragma: false,  
  * rango de líneas a formatear (útil para formatear solo una parte del archivo)
    - rangeStart: 0,
  * rangeEnd: Infinity,

  */
};  
