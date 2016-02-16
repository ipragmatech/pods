/*global jQuery, _, Backbone, Mn */
const $ = jQuery;

export const PickFlexibleQueueModel = Backbone.Model.extend( {
	defaults: {
		id       : 0,
		filename : '',
		progress : 0,
		error_msg: ''
	}
} );

/**
 *
 */
export const PickFlexibleQueueItem = Mn.LayoutView.extend( {
	model: PickFlexibleQueueModel,

	tagName: 'li',

	template: _.template( $( '#pick-flexible-queue-template' ).html() ),

	attributes: function () {
		return {
			class: 'pods-file',
			id   : this.model.get( 'id' )
		};
	},

	modelEvents: {
		'change': 'onModelChanged'
	},

	onModelChanged: function () {
		this.render();
	}

} );

/**
 *
 */
export const PickFlexibleQueue = Mn.CollectionView.extend( {
	tagName: 'ul',

	className: 'pods-files pods-files-queue',

	childView: PickFlexibleQueueItem
} );
