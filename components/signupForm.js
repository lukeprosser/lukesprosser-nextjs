import { useEffect } from 'react';

const FORM_SIGNUP_CODE = process.env.FORM_SIGNUP_CODE;
const FORM_SIGNUP_ACTION_CODE = process.env.FORM_SIGNUP_ACTION_CODE;
const FORM_SIGNUP_SCRIPT_CODE = process.env.FORM_SIGNUP_SCRIPT_CODE;

export default function SignupForm() {
  useEffect(() => {
    const js = `function ml_webform_success_${FORM_SIGNUP_CODE}() {
      var $ = ml_jQuery || jQuery;
      $('.ml-subscribe-form-290192 .row-success').show();
      $('.ml-subscribe-form-290192 .row-form').hide();
    }`;
    const script = document.createElement('script');
    const scriptText = document.createTextNode(js);
    script.appendChild(scriptText);
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = `https://groot.mailerlite.com/js/w/webforms.min.js?${FORM_SIGNUP_SCRIPT_CODE}`;
    document.body.appendChild(script2);
  }, []);

  return (
    <div
      id={`mlb2-${FORM_SIGNUP_CODE}`}
      className='p-6 mt-6 text-lg font-light rounded md:mt-0 bg-slate-100 dark:bg-slate-800 ml-form-embedContainer ml-subscribe-form ml-subscribe-form-290192'
    >
      <div className='ml-form-align-center '>
        <div className='ml-form-embedWrapper embedForm'>
          <div className='ml-form-embedBody ml-form-embedBodyDefault row-form'>
            <div className='ml-form-embedContent'>
              <p>
                Stay updated and get the very latest from the blog, straight to
                your inbox:
              </p>
            </div>
            <form
              className='ml-block-form'
              action={`https://assets.mailerlite.com/jsonp/22375/forms/${FORM_SIGNUP_ACTION_CODE}/subscribe`}
              data-code=''
              method='post'
              target='_blank'
            >
              <div className='my-4 ml-form-formContent'>
                <div className='mb-2 ml-form-fieldRow '>
                  <div className='ml-field-group ml-field-name ml-validate-required'>
                    <input
                      aria-label='name'
                      aria-required='true'
                      type='text'
                      className='w-full p-2 text-base placeholder-gray-400 border-2 rounded dark:bg-slate-100 form-control'
                      data-inputmask=''
                      name='fields[name]'
                      placeholder='First name'
                      autoComplete='name'
                    />
                  </div>
                </div>
                <div className='ml-form-fieldRow ml-last-item'>
                  <div className='ml-field-group ml-field-email ml-validate-email ml-validate-required'>
                    <input
                      aria-label='email'
                      aria-required='true'
                      type='email'
                      className='w-full p-2 text-base placeholder-gray-400 border-2 rounded dark:bg-slate-100 form-control'
                      data-inputmask=''
                      name='fields[email]'
                      placeholder='Email'
                      autoComplete='email'
                    />
                  </div>
                </div>
              </div>
              <input type='hidden' name='ml-submit' value='1' />
              <div className='ml-form-embedSubmit'>
                <button
                  type='submit'
                  className='w-full p-2 font-medium text-gray-100 bg-indigo-600 rounded hover:bg-indigo-500 primary'
                >
                  Sign up
                </button>
                <button
                  disabled='disabled'
                  style={{ display: 'none' }}
                  type='button'
                  className='loading'
                >
                  <div className='ml-form-embedSubmitLoad'></div>
                  <span className='sr-only'>Loading...</span>
                </button>
              </div>
              <input type='hidden' name='anticsrf' value='true' />
            </form>
          </div>
          <div
            className='ml-form-successBody row-success'
            style={{ display: 'none' }}
          >
            <div className='ml-form-successContent'>
              <h4>Thank you!</h4>
              <p>Please check your inbox to confirm your subscription.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
