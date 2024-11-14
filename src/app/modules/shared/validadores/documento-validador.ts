import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado para CPF
 * @returns Função validadora de CPF personalizada
 */
export function validarCPF(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validarDocumento(control, 'CPF');
  };
}

/**
 * Validador personalizado para CNPJ
 * @returns Função validadora de CNPJ personalizada
 */
export function validarCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validarDocumento(control, 'CNPJ');
  };
}

/**
 * Validador para campos de CPF e CNPJ nos formulários
 * @param control campo do formulário objeto de validação
 * @param tipo especifica se é um CPF ou um CNPJ que está sendo validado
 * @returns um objeto ValidationErrors com o campo documentoInvalido em TRUE
 * caso o campo ñ seja válido e NULL, caso o campo seja válido.
 */
function validarDocumento(
  control: AbstractControl,
  tipo: 'CPF' | 'CNPJ'
): ValidationErrors | null {
  const documento = control.value?.replace(/\D/g, ''); // Remove caracteres não numéricos
  const tamanhoEsperado = tipo === 'CPF' ? 11 : 14;

  // Verifica se o documento tem o tamanho correto e se não é uma sequência repetida
  if (
    !documento ||
    documento.length !== tamanhoEsperado ||
    /^(\d)\1+$/.test(documento)
  ) {
    return { documentoInvalido: true };
  }

  return null; // Documento válido
}
