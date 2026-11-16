/**
 * Here we defined all the FE route paths that will be used by BE (for instnace while sending an emial with a link to the FE)
 */
export namespace FeCustomRoutes {
  export type TestPathParams = {
    token: string;
  };
  export const buildTestPath = (params: TestPathParams & {
    feUrl?: string;
  }) => {
    return `${params.feUrl ?? ''}/test-path?token=${params.token}`;
  };
}
