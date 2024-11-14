import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado para E-mails
 * @returns Função validadora de E-mails personalizada
 */
export function validarEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Obtendo o valor digitado pelo usuário
    const email = control.value;

    // Expressão regular usada para validar se o valor digitado possui o
    // formato básico de um e-mail, com @ e um ponto.
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Retornando um ValidationErrors com o atributo emailInvalido em TRUE
    // caso o email possua um formato inválido e NULL, caso o formato do email esteja correto.
    return email && !regex.test(email) ? { emailInvalido: true } : null;
  };
}
