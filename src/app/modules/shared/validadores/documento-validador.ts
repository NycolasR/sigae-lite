import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarCPF(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validarDocumento(control, 'CPF');
  };
}

export function validarCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validarDocumento(control, 'CNPJ');
  };
}

function validarDocumento(
  control: AbstractControl,
  tipo: 'CPF' | 'CNPJ'
): ValidationErrors | null {
  const documento = control.value?.replace(/\D/g, '');
  const tamanhoEsperado = tipo === 'CPF' ? 11 : 14;

  if (
    !documento ||
    documento.length !== tamanhoEsperado ||
    /^(\d)\1+$/.test(documento)
  ) {
    return { documentoInvalido: true };
  }

  return null;
}
