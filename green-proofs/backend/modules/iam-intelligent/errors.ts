import {
  AppError,
  Throwable,
} from '@energywebfoundation/generic-green-proofs-api';

@Throwable('iam_intelligent', 500)
export class IamIntelligentError extends AppError { }

@Throwable('company_without_account', 500)
export class CompanyWithoutAccountError extends IamIntelligentError {
  constructor(details: { externalId: string }) {
    super({
      details,
    });
  }
}
