<?php

namespace JaztecAdmin\Frontend\Component;

use JaztecAdmin\Frontend\Component;
use KJSencha\Frontend\Expr;

/**
 * A loginform to be rendered with ExtJS
 */
class LoginForm extends Component
{

    protected $attributes = array();

    function __construct()
    {
        $jsFuncKeypress   = "function(text, e) {
            if (e.button === 12) {
                var form = text.up('form'),
                    loginWindow = form.up('#login-container');
                loginWindow.submit(form);
            }
        }";
        $jsFuncButton     = "function(btn) {
            var loginWindow = btn.up('#login-container'),
                form = loginWindow.down('form');
                loginWindow.submit(form);
        }";
        $this->attributes = array(
            'extend' => 'Ext.container.Container',
            'width'  => 450,
            'height' => 250,
            'y'      => 200,
            'id'     => 'login-container',
            'border' => false,
            'layout' => array(
                'align' => 'center',
                'type'  => 'vbox',
            ),
            'items'  => array(
                array(
                    'xtype'  => 'panel',
                    'frame'  => true,
                    'border' => false,
                    'height' => 279,
                    'width'  => 279,
                    'html'   => '<img src="/img/logo.png" title="Log in" />',
                ),
                array(
                    'xtype'         => 'form',
                    'border'        => false,
                    'url'           => '/user/login',
                    'bodyStyle'     => array(
                        'padding' => '5px 5px 0;'
                    ),
                    'fieldDefaults' => array(
                        'labelWidth' => 120,
                        'msgTarget'  => 'side'
                    ),
                    'defaults'      => array(
                        'anchor'          => '100%',
                        'enableKeyEvents' => true,
                        'listeners'       => array(
                            'keypress' => new Expr($jsFuncKeypress),
                        ),
                    ),
                    'items'         => array(
                        array(
                            'xtype'      => 'textfield',
                            'fieldLabel' => 'Gebruikersnaam',
                            'allowBlank' => true,
                            'name'       => 'identity',
                        ),
                        array(
                            'xtype'      => 'textfield',
                            'inputType'  => 'password',
                            'fieldLabel' => 'Wachtwoord',
                            'allowBlank' => true,
                            'name'       => 'credential',
                        ),
                    )
                ),
                array(
                    'xtype'       => 'panel',
                    'border'      => false,
                    'bodyPadding' => 5,
                    'layout'      => array(
                        'type'  => 'hbox',
                        'align' => 'center'
                    ),
                    'items'       => array(
                        array(
                            'xtype' => 'box',
                            'flex'  => 1,
                        ),
                        array(
                            'xtype'   => 'button',
                            'text'    => 'Inloggen',
                            'scale'   => 'medium',
                            'handler' => new Expr($jsFuncButton),
                        ),
                    )
                ),
            ),
            'submit' => new Expr("
                function(form) 
                {
                    var me = this;
                    if (form.getForm().isValid()) {
                        form.body.mask('Inloggen');
                    } else {
                        return false;
                    }
                    form.getForm().submit({
                        success: function(obj, response)
                        {
                            form.body.unmask();
                            me.close();
                            // Reload the application's viewport.
                            JaztecAdminApp.viewport.removeAll();
                            JaztecAdminApp.viewport.getLoader().load();
                            JaztecAdminApp.getApplication().loadControllers();
                        },
                        failure: function(obj, rsp)
                        {
                            form.getForm().markInvalid({
                                'username-field': Ext.decode(rsp.response.responseText)['messages']
                            });
                            form.body.unmask();
                        }
                    });
                }
            "),
        );
    }

}
