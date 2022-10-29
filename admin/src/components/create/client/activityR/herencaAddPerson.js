import tools from "../../../../tools";
let validate = tools.validate;

let herenciaAddPersona = (setInput, input, document )=>{
    return {
        setInput,
        input,
        validate:validate.agregarPersona,
        cbValidate:validate.agregarPersona_field,
        seteo: {
          campos: [
          {
            label: 'Grupo de edad',
            fT: 'select',
            fV: {
              cN: 'ageR',
              name: 'ageR',
              onChange: tools.formActions.subL.handleChange,
              options: ["Adulto Mayor", "Adulto", "Adolecente", "niño"]
            }
          },
          {
            label: 'sexo',
            fT: 'select',
            fV: {
              cN: 'sexo',
              name: 'sexo',
              onChange: tools.formActions.subL.handleChange,
              options: ["Femenino", "Masculino", "otro"],
            }
          }
          ],
          vals: {
            validate: validate.agregarPersona_field,
            force: [
              document.getElementById("ageR"),
              document.getElementById("sexo"),
            ],
            set: [
              {cb: setInput, val: (_in)=>{
                              return  { ...input, 
                                      persons: [...input.persons, _in]}
                              }
              },
            ],
            clear: [
              {cb: null, 
                val: { ageR: "", sexo: "" }},
              {cb: null,
                val: { ageR: "", sexo: "", general: "" }},  
              {cb: (id)=>{id.selected = true},
                val: document.getElementById("ageR")},
              {cb: (id)=>{id.selected = true},
                val: document.getElementById("sexo")},
            ]
          },
        },
    }
  }
export default herenciaAddPersona;