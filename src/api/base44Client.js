import { Base44 } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

export const base44 = new Base44({
    appId: appParams.appId,
    token: appParams.token,
    functionsVersion: appParams.functionsVersion,
});
