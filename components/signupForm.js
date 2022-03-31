import { useEffect } from 'react';

export default function SignupForm() {
  useEffect(() => {
    const js = `function ml_webform_success_1755242(){var r=ml_jQuery||jQuery;r(".ml-subscribe-form-1755242 .row-success").show(),r(".ml-subscribe-form-1755242 .row-form").hide()}`;
    const script = document.createElement('script');
    const scriptText = document.createTextNode(js);
    script.appendChild(scriptText);
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src =
      'https://static.mailerlite.com/js/w/webforms.min.js?v9b62042f798751c8de86a784eab23614';
    document.body.appendChild(script2);
  }, []);

  return (
    <div
      id='mlb2-1755242'
      className='p-6 mt-6 text-lg font-light rounded md:mt-0 bg-slate-100 dark:bg-slate-800 ml-form-embedContainer ml-subscribe-form ml-subscribe-form-1755242'
    >
      <div className='ml-form-align-center'>
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
              action='https://static.mailerlite.com/webforms/submit/v5e9n4'
              data-code='v5e9n4'
              method='post'
              target='_blank'
            >
              <div className='ml-form-formContent'>
                <div className='ml-form-fieldRow ml-last-item'>
                  <div className='ml-field-group ml-field-email ml-validate-email ml-validate-required'>
                    <input
                      aria-label='email'
                      aria-required='true'
                      type='email'
                      className='w-full p-2 mt-4 mb-6 text-base placeholder-gray-400 rounded dark:bg-slate-100 form-control'
                      data-inputmask=''
                      name='fields[email]'
                      placeholder='Enter your email'
                      autoComplete='email'
                    />
                  </div>
                </div>
              </div>
              <input type='hidden' name='ml-submit' value='1' />
              <div className='ml-form-embedSubmit'>
                <button
                  type='submit'
                  className='w-full p-2 font-medium text-gray-100 bg-gray-900 rounded hover:bg-indigo-600 dark:bg-indigo-600 primary dark:hover:bg-indigo-700'
                >
                  Sign up
                </button>
                <button
                  disabled='disabled'
                  style={{ display: 'none' }}
                  type='button'
                  className='loading'
                >
                  {' '}
                  <div className='ml-form-embedSubmitLoad'></div>{' '}
                  <span className='sr-only'>Loading...</span>{' '}
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
              <p>You have successfully joined our subscriber list.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
