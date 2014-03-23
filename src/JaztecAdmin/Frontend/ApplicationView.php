<?php

namespace JaztecAdmin\Frontend;

use KJSencha\Frontend\Expr;

/**
 * Main application view
 *
 * @author Jasper van Herpt
 */
class ApplicationView extends Component
{

    /**
     * @var array
     */
    protected $attributes = array();

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
