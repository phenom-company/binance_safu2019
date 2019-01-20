import AjaxTool from '@/store/utils/ajax_tool';
import moment from 'moment';

import { API } from '@/api/path';

export const registrationUser = (data) => {
  return new Promise((resolve, reject) => {
    AjaxTool.post(`${API}/user/create-user/`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getPersonalDetailsAuthUser = () => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/user-info/`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const verifyEmail = (code) => {
  return new Promise((resolve, reject) => {
    const data = {
      code: code
    };

    AjaxTool.post(`${API}/user/verify-email/`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const requestRestorePassword = (email, blocker) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email
    };

    AjaxTool.post(`${API}/user/request-restore-password/`, data, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const checkCodeRestorePassword = (code) => {
  return new Promise((resolve, reject) => {
    const data = {
      code: code
    };

    AjaxTool.post(`${API}/user/check-restore-password/`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const restorePassword = (data, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.post(`${API}/user/restore-password/`, data, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const changePassword = (data, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.post(`${API}/user/change-password/`, data, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const addNewCase = (data, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.put(`${API}/user/cases/`, data, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const addFileToCase = (caseId, file) => {
  return new Promise((resolve, reject) => {
    AjaxTool.putFormData(`${API}/user/cases/file/?case_id=${caseId}`, file)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getCases = (param, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/cases/`, param, blocker)
      .then((response) => {
        const data = response.data.map(item => {
          const date =  moment(item.created_at_dt);
          return {
            id: item.id,
            created_at_dt: date.format('YYYY-MM-DD HH:MM:SS'),
            currency: item.currency,
            address: item.address,
            txid: item.txid,
            type: item.type,
            status: item.status,
            income: item.income
            
          };
        });
        resolve(data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getInformCase = (caseId, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/cases/${caseId}`, {}, blocker)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getBalanceList = (param, blocker) => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/balances/`, param, blocker)
      .then((response) => {
        const data = response.data.map(item => {
          const date =  moment(item.created_at_dt);
          return {
            id: item.id,
            created_at_dt: date.format('YYYY-MM-DD HH:MM:SS'),
            operation: item.operation,
            wallet: item.wallet,
            amount: item.amount
          };
        });
        resolve(data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getKycApplicant = () => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/kyc-applicant/`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getReferalData = () => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/referrals/`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getCurrencyList = () => {
  return new Promise((resolve, reject) => {
    AjaxTool.get(`${API}/user/currencies`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
