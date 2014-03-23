<?php

namespace JaztecAdmin\Frontend\Component;

use JaztecAdmin\Frontend\Component;
use KJSencha\Frontend\Expr;

/**
 * A loginform to be rendered with ExtJS
 */
class Loginform extends Component
{

    protected $attributes = array();

    public function __construct()
    {
        $this->attributes = array(
            'extend' => 'Ext.container.Container',
            'width'  => 450,
            'height' => 250,
            'y'      => 160,
            'id'     => 'login-container',
            'border' => false,
            'layout' => array(
                'align' => 'center',
                'type'  => 'vbox',
            ),
            'items'  => array(
                $this->getLogoPanel(),
                $this->getFormPanel(),
                $this->getButtonPanel(),
            ),
            'submit' => $this->getSubmitAction(),
        );
    }

    /**
     * Returns the keypress handler of the loginform.
     * @return string
     */
    protected function getJsFuncKeypress()
    {
        return "function (text, e) {
            if (e.button === 12) {
                var form = text.up('form'),
                    loginWindow = form.up('#login-container');
                loginWindow.submit(form);
            }
        }";
    }

    /**
     * Returns the button handler for the login form.
     * 
     * @return string
     */
    protected function getJsFuncButton()
    {
        return "function (btn) {
            var loginWindow = btn.up('#login-container'),
                form = loginWindow.down('form');
                loginWindow.submit(form);
        }";
    }

    /**
     * Returns the panel which forms the logo of the login form.
     * @return array Config for logo panel
     */
    protected function getLogoPanel()
    {
        return array(
            'xtype'  => 'panel',
            'frame'  => false,
            'border' => false,
            'height' => 279,
            'width'  => 279,
            'html'   => '<img src="/img/logo.png" title="Log in" />',
        );
    }

    /**
     * Return the login forms credential panel.
     * @return array Config for form panel
     */
    protected function getFormPanel()
    {
        return array(
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
                    'keypress' => new Expr($this->getJsFuncKeypress()),
                ),
            ),
            'items'         => array(
                array(
                    'xtype'      => 'textfield',
                    'fieldLabel' => 'Gebruikersnaam',
                    'allowBlank' => false,
                    'name'       => 'identity',
                ),
                array(
                    'xtype'      => 'textfield',
                    'inputType'  => 'password',
                    'fieldLabel' => 'Wachtwoord',
                    'allowBlank' => false,
                    'name'       => 'credential',
                ),
            )
        );
    }

    /**
     * Returns the button panel of the login form.
     * @return array Config for the buttons of the login form.
     */
    protected function getButtonPanel()
    {
        return array(
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
                    'iconCls' => 'icon-engage',
                    'scale'   => 'large',
                    'handler' => new Expr($this->getJsFuncButton()),
                ),
            )
        );
    }

    /**
     * Returns the action to be called at submitting the login form.
     * @return \KJSencha\Frontend\Expr
     */
    protected function getSubmitAction()
    {
        return new Expr(
            "
            function (form) {
                var me = this;
                if (form.getForm().isValid()) {
                    form.body.mask('Inloggen');
                } else {
                    return false;
                }
                form.getForm().submit({
                    success: function (obj, response) {
                        form.body.unmask();
                        me.close();
                        // Reload the application's viewport.
                        JaztecAdminApp.viewport.removeAll();
                        JaztecAdminApp.viewport.getLoader().load();
                    },
                    failure: function (obj, rsp) {
                        form.getForm().markInvalid({
                            'username-field': Ext.decode(rsp.response.responseText)['messages']
                        });
                        form.body.unmask();
                    }
                });
            }
            "
        );
    }
}
