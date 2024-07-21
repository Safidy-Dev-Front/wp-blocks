/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps , InspectorControls , RichText} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl , ColorPalette } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes , setAttributes}) {
	const blockProps = useBlockProps();
	const { title ,titleColor , content} = attributes
	const updateContent = (event)=>{
		setAttributes({content : event})
	}
	const updateTitle = (event) =>{
		setAttributes( { title: event} )
	}
	const updateColorTitle = (event) =>{
		setAttributes( { titleColor: event} )
	}
	return (
		<>
		<InspectorControls>
			<PanelBody title='Parametre Couleur du Titre'>
				<p><strong>Selectioner un couleur de titre</strong></p>
				<ColorPalette 
				value={titleColor}
				onChange={updateColorTitle}/>
			</PanelBody>
		</InspectorControls>
		
			<RichText
                { ...blockProps }
				key="editable"
                tagName="h2" 
                value={ title } 
                allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                onChange={ updateTitle } 
                placeholder={ __( 'Heading...' ) } 
				style={{color: titleColor}}
			/>
			<RichText
                { ...blockProps }
				key="editable"
                tagName="p" 
                value={ content } 
                allowedFormats={ [ 'core/bold', 'core/italic' ] } 
                onChange={ updateContent } 
                placeholder={ __( 'Your content...' ) } 
            />
		</>
	);
}
