<?php

namespace JaztecAdmin\Frontend;

use KJSencha\Frontend\Expr;

/**
 * Main application view
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
class ApplicationView extends Component
{

    /**
     * @var array
     */
    protected $attributes = array();

    /**
     * Create an ApplicationView configuration for the ExtJS component loader.
     */
    public function __construct()
    {
        $funcMainPanel = new Expr(
            "
                function () {
                    return this.down('panel');
                }
            "
        );
        $this->attributes = array(
            'layout' => 'fit',
            'id'     => 'app-main-body',
            'alias'  => 'widget.appMainBody',
            'items'  => array(
                array(
                    'xtype' => 'jaztec-main-panel'
                ),
            ),
            'getMainPanel' => $funcMainPanel,
        );
    }
}
